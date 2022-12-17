const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();
// get,post,put,patch,delete,option,head
app.get('/',(req,res)=>{
    res.send('Hello Express 不用自己按~~~~~');
});
// (數字看自己設多少port,但不可與其他重複。ex:react=>3000、mySQL=>3006)
app.listen(3001,()=>{
    console.log('Server running at port 3001');
});

