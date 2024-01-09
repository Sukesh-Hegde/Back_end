const express = require('express');

const server = express();

server.get("/",(req,res)=>{
    return res.send("Welcome to inventory app");
})

server.listen(3400)