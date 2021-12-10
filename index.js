const express = require("express");
const port = process.env.PORT || 5000;
const mongoConnect = require("./database/mongoConnect");
const cors = require("cors");
const path = require("path");
const fileupload = require('express-fileupload');
require("dotenv").config();

mongoConnect();
const app = express();
app.use(cors());
app.use(fileupload())
app.use(express.json());
app.use(express.static(__dirname+'./public/'))

app.use("/api/user", require("./routes/user"));
app.use("/api/courses", require("./routes/class"));
app.use("/api/review", require("./routes/review"));
app.post("/api/upload", (req, res)=>{
  let file = req.files.file;
  console.log(file)
  file.mv('./upload/' + file.name, function(err, result){
    if(err){
      res.send(err)
    }else{
      res.send("success")
    }
  })
})

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Listning at http://localhost:${port}`);
});
