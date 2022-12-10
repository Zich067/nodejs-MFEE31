// ！！Promise 是一個表示非同步運算的最終完成或失敗的物件。 ！！

// 1. Promise 是一個物件 new Promise()
//    new Promise(executor)
//    executor: function(resolve, reject) {}

// 2. 執行非同步工作

// 3. 最終完成或失敗
//    完成 -> 呼叫 resolve
//    失敗 -> 呼叫 reject

let doWorkPromise = function (job, timer) {
    // 1. 物件 -> new
    return new Promise((resolve, reject) => {
      // 2. 執行非同步工作
      setTimeout(() => {
        let now = new Date()
        resolve(`完成工作 ${job} at ${now.toISOString()}`)
      }, timer)
    })
  }

  let now = new Date()
  console.log(`工作開始 at ${now.toISOString()}`)
  let brushPromise = doWorkPromise('刷牙', 3000)
  
  //await --> 暫停鍵
  async function doJob() {
    try{
    let result = await brushPromise
    console.log('這是 await 後的結果1', result)

    let result2 = await doWorkPromise('吃早餐',5000)
    console.log('這是 await 後的結果2', result2)

    let result3 = await doWorkPromise('寫功課',3000)
    console.log('這是 await 後的結果3', result3)
    } catch(e) {
        console.log('發生錯誤了',error)
    }
}
  doJob()
  console.log('after')