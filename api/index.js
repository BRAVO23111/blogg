const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(10);
const secret = "hasbdfcbsbdfibsdbhcbsdhjcb"

//database connection
 mongoose.connect('mongodb+srv://blog:7MqtGudi8a3zv5Ar@cluster0.1ksvgrb.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true})


app.use(cors());
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
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
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

app.listen(4000, (req, res) => {
  console.log("server at 4000");
});

////mongodb+srv://blog:7MqtGudi8a3zv5Ar@cluster0.1ksvgrb.mongodb.net/?retryWrites=true&w=majority

