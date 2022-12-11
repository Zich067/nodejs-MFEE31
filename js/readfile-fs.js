const fs = require('fs')

// error-first callback
// fs.readFile('test.txt', 'utf-8', (err, data) => {               
//   if (err) {
//     // 如果 err 有值，表示有錯誤發生
//     // 這裡應該要處理錯誤
//     console.error('發生錯誤了', err)
//   } else {
//     // 進來這裡，表示 err 是空的 (可能是 null)
//     console.log('成功讀到資料:', data)
//   }
// })

let p = new Promise((resolve, reject) => {
    fs.readFile('test.txt', 'utf-8', (error, data) => {
        if (error) {
            reject(error)
        } else {
            resolve(data)
        }
      })
});

// async function doJob(){
//     let data = await p
// }

// //函式名稱() -> 呼叫
// doJob()

//IIEF
//(()=>{})()  ->最後一個() 為呼叫函式，立即呼叫有沒有名稱都沒關係

(async () => {
    try {
      let data = await p
      console.log('用 await 拿到的結果', data)
    } catch (e) {
      console.error('catch 到的錯誤', e)
    }
  })();

//-----------------------------------------
//   //定義
//   function test(參數1, 參數2){};
//   //呼叫
//   test();

//   let test = function(){};
//   test();

//   (function test(參數1, 參數2){})();

//   ((參數1, 參數2) => {})();
    