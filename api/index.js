const express = require('express')
const app = express()

app.get("/",(req,res)=>{
    res.json("got it")
})

app.listen(4000,(req,res)=>{
    console.log("server at 4000");
})
