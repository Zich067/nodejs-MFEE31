const express = require('express');
const router = express.Router();
const { body, validationResult }= require('express-validator');

const pool = require('../utils/db')

const argon2 = require('argon2');


router.use((req, res, next) =>{
    console.log('這裡是 auth router 的中間件');
    next();
});

// 要處理content-type 是 multer/from-data
// express 沒有內建，需要另外安裝套件
// 這邊用地三方套件 multer來處理
const multer = require('multer');
const path =require('path');
const storage = multer.diskStorage({
    // 設定儲存目的地 -> 檔案夾
    // 先手動建立好資料夾public/uploads
    destination:function(req, file, cb){
        // __dirname目前檔案在的位置
        // path.join:避免不同作業系統之間/ 或 \
        cb(null, path.join(__dirname, '..' ,'public','uploads'));
    },
    // 圖片名稱
    filename:function(req,file,cb){
    console.log('mukter storage',file)
       const ext =  file.originalname.split('.').pop();
       cb(null, `${Date.now()}.${ext}`);
    },
});

// 真正上傳處理
const uploads = multer({
    storage:storage,
    fileFilter:function(req, file, cd){
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
        cd(new Error('上傳圖片格是不合法'),false);
    }else{
        cd(null, true)
    }
    },
    // 限制檔案大小
    limits:{
        fieldSize: 200 * 1024,
    },
});

 // 驗證資料 validation => 後端不可以相信前端的資料
const registerRules = [
    // 中間件：負責檢查 email 是否合法
    body('email').isEmail().withMessage('請輸入正確的Email格式'),
    // 中間件：檢查密碼長度
    body('password').isLength({min: 8}).withMessage('密碼長度至少為 8 碼'),
    // 中間件：檢查 password 跟 confirmpassWord是否一致
    // 客製自己想要的檢查條件
    body('confirmPassword')
    .custom((value,{req})=>{
        return value === req.body.password;
    })
    .withMessage('驗證密碼不符合'),
];



// /api/auth
router.post('/register',uploads.single('photo'),registerRules,async(req,res,next) => {
    // req.body表單送出的資料
    console.log('I am register', req.body);

    // 處理驗證結果
    const validateResult = validationResult(req);
    console.log(validateResult);
    if(!validateResult.isEmpty()){
        // validateResult 不是空的 -> 表示有錯誤
        return res.status(400).json({ errors:validateResult.array() });
    }

    // 檢查Email是否註冊過
    let [members] = await pool.execute('SELECT * FROM members WHERE email = ?',[req.body.email]);
    if(members.length > 0) {
        // 表示email 有存在資料庫中
        // 如果已經註冊過，就回復 400
        return res.status(400).json({
            errors:[{
                msq:'Email 已經重複註冊',
                param:'email',
                },
            ],
        });
    };
    console.log('email檢查',members);

    // 雜湊 hash 密碼
    const hashedPassword = await argon2.hash(req.body.password);

    // 存到資料庫
    // 吮許使用者不上傳圖片，所以
    const filename = req.file ? path.join('uploads',req.file.filename) : '';
    let result = await pool.execute('INSERT INTO members (email, password, name, photo) VALUES (?,?,?,?)', [req.body.email ,hashedPassword, req.body.name, filename]);
    console.log('redisterLinsert to db',result);

    // 回覆給前端
    
    res.json({
        email:req.body.email,
        members_id:result[0].insertId,
    });
});

module.exports = router;
