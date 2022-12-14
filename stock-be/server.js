const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

require ('dotenv').config();
const pool = require('./utils/db');

app.use(express.json());
// 允許跨元存取
// 預設是全部開放
// 也可以做部分限制，參考 npm cors的文件
const cors = require('cors');
app.use(cors());


// middleware => pipeline pattern

// 設定express處理靜態檔案
//  -> express 內建，不需要安裝任何東西
// localhost:3001/2048
// app.use(express.static('./static'))

app.use('/2048',express.static('./static'));

// 處理使用者註冊時上傳網址
// 圖片位置http://localhost:3001/public/uploads/1673160962828.png
app.use('/public',express.static('./public'));

// 中間件
app.use((req ,res, next) => {
    console.log('這裡是第一個中間件A');
    // 可以自行創立任意改變
    req.mfee31='水母班';
    next();
    // res.send('這裡是 A 中間件');
});


app.use((req ,res, next) => {
    console.log('這裡是第一個中間件B');
    req.dt =new Date().toISOString();
    next();
});

// app.[Method]
// get,post,put,patch,delete,option,head
// 路由中間件
app.get('/',(req,res, next)=>{
    console.log('這是頁面2',req.mfee31,req.dt);
    res.send('Hello Express 9 首頁喔~~');
});

app.get('/api',(req, res, next) =>{
    res.json({
        name: 'john',
        age: 18,
    });  
});

const stockRouter = require('./routers/stockRouter');
app.use('/api/stocks',stockRouter);

const authRouter = require('./routers/authRouter');
app.use('/api/auth/',authRouter);

app.use((req, res, next) => {
    console.log('這裡是的一個中間件 C');
    next();
  });

app.get('/test',(req,res)=>{
    console.log('這是test頁面',req.dt);
    res.send('Hello Test 1');
});

// 放在所有路由中間的後面
// 前面所有的路由對比不到對的網址，就會掉到這裡來
// --> 就是一個404的情況
// 利用了中間件會依照比對程式碼順序來執行的特性來達成
app.use((req, res, next) => {
    console.log('這裡是404')
    res.send('沒有這個網頁啦!!')
})
// (數字看自己設多少port,但不可與其他重複。ex:react=>3000、mySQL=>3006)
app.listen(3001,()=>{
    console.log('Server running at port 3001');
});