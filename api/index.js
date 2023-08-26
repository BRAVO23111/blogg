const express = require("express");
const cors = require("cors");
const app = express();
const mongoose=require('mongoose');
const User = require('./models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const salt = bcrypt.genSaltSync(10);
const secret = "hasbdfcbsbdfibsdbhcbsdhjcb";
app.use(cookieParser()) ;

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
//database connection
 mongoose.connect('mongodb+srv://blog:sgFdSqpCYAq5wW6T@cluster0.exijc3f.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true})



app.use(express.json());
// app.use(express.static(__dirname));
// app.get("/register",(req,res)=>{
//   res.json("go it")
// })

//login get request chck
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({username,password:bcrypt.hashSync(password,salt)})

  res.json(userDoc); 
});


app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token',token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});


app.get('/profile', (req,res) => {
  const {token} =req.cookies;
  jwt.verify(token,secret,{},(err,info)=>{
    if (err) throw err ;
    res.json(info);
  })
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});


app.listen(4000, (req, res) => {
  console.log("server at 4000");
});





//


//D6VuXLeNQcVwDkCS