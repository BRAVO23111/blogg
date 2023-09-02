const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadmiddleware = multer({ dest: "uploads" });
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);
const secret = "hasbdfcbsbdfibsdbhcbsdhjcb";
const PostUser = require("../api/models/PostUser");
app.use(cookieParser());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//database connection
mongoose.connect(
  "mongodb+srv://blog:sgFdSqpCYAq5wW6T@cluster0.exijc3f.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(express.json());
app.use('/uploads',express.static(__dirname+'/uploads'));
// app.get("/register",(req,res)=>{
//   res.json("go it")
// })

//login get request chck
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.create({
    username,
    password: bcrypt.hashSync(password, salt),
  });

  res.json(userDoc);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
  }
});
app.put('/post', uploadmiddleware.single("file"),async(req,res)=>{
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, secret, {},async (err, info) => {
    if (err) throw err;
    const {postid, title, summary, content } = req.body;
    const postdata = await PostUser.findById(postid);
    const isid = PostUser.postid = info.postid;
    res.json({isid});
    // res.json(info);
  });
  // jwt.verify(token, secret, {}, async (err, info) => {
  //   if (err) throw err;
    // const {postid, title, summary, content } = req.body;
    // const postdata = await PostUser.findById(postid);
    // const isid = PostUser.postid = info.postid;
    // res.json({isid});
    // const PostDoc = await PostUser.create({
    // title,
    // summary,
    // content,
    // cover: newpath,
    // });
      // res.json(PostDoc);
    });

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadmiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newpath = path + "." + ext;
  fs.renameSync(path, newpath);
  
   const {title, summary, content } = req.body;
  const PostDoc = await PostUser.create({
  title,
  summary,
  content,
  cover: newpath,
  });
    res.json(PostDoc);
  });

  // const { title, summary, content } = req.body;
  // const PostDoc = await PostUser.create({
  // title,
  // summary,
  // content,
  // cover: newpath,
  // });

app.get("/post",async(req,res)=>{
    res.json(await PostUser.find());
})

app.get('/post/:postid',async(req,res)=>{
  const {postid} = req.params;
  const postData = await PostUser.findById(postid);
  res.json(postData);
})



app.listen(4000, (req, res) => {
  console.log("server at 4000");
});

//

//D6VuXLeNQcVwDkCS
