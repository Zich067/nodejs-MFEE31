// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require('axios');
const fs = require("fs/promises");
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
//2016,2330,2412

(async () => {
  try {
    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    // console.log(stockNo)
    let date = '20221111';
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    })

    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})()