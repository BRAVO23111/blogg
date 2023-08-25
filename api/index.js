const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(10);
const secret = "hasbdfcbsbdfibsdbhcbsdhjcb"
app.use(cookieParser()) 

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//database connection
 mongoose.connect('mongodb+srv://blog:HeZgF7qHvBxQnl83@cluster0.j3bkuiq.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true})



app.use(express.json());
// app.use(express.static(__dirname));
app.get("/register",(req,res)=>{
  res.json("go it")
})

//login get request chck

app.post("/login",async(req,res)=>{
  const{username,password}= req.body;
  const userDoc = await User.findOne({username})
  const passok = bcrypt.compareSync(password,userDoc.password)
  if(passok){
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json('ok');
      res.json(token)
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});
 

//register get request

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({username,password:bcrypt.hashSync(password,salt)})

  res.json(userDoc); 
});



app.get("/profile",(req,res)=>{
  const {token} =req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{
    if (err) throw err;
    res.json(info)
  })
})

app.post("/logout",(req,res)=>{
  req.cookie('token',' ').json(ok)
})


app.listen(4000, (req, res) => {
  console.log("server at 4000");
});





//



//HeZgF7qHvBxQnl83