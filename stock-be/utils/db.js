const mysql2 = require('mysql2/promise');
require ('dotenv').config();

let pool = mysql2.createPool({   
        host:process.env.DB_HOST,
        port:process.env.DB_PORT,
        user:process.env.DB_USER,
        password:process.env.DB_PWD,
        database:process.env.DB_DATABASE,
        // 限制pool連線數上限
        connectionLimit:10,
      });

// 共同使用
module.exports = pool;