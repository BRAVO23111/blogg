const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


//database connection
 mongoose.connect('mongodb+srv://blog:7MqtGudi8a3zv5Ar@cluster0.1ksvgrb.mongodb.net/?retryWrites=true&w=majority')


app.use(cors());
app.use(express.json());
// app.use(express.static(__dirname));
app.get("/register",(req,res)=>{
  res.json("go it")
})

//login get request

app.post("/login",async(req,res)=>{
  const{username,password}= req.body;
  const userDoc = await User.findOne({username})
  const passok = bcrypt.compareSync(password,userDoc.password)
  if(passok){

  }
  else{
    alert('wrong credentials')
  }
  res.json(userDoc)
})

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

