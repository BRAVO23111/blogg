const express = require("express");
const cors = require("cors");
const app = express();



app.use(cors());
app.use(express.json());



app.post("/register", (req, res) => {
  const { username, password } = req.body;
  res.json({ requestData: { username, password } });
});

app.listen(4000, (req, res) => {
  console.log("server at 4000");
});

////mongodb+srv://blog:7MqtGudi8a3zv5Ar@cluster0.1ksvgrb.mongodb.net/?retryWrites=true&w=majority
