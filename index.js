const express = require('express');
const port = process.env.PORT || 5000;
const mongoConnect = require('./database/mongoConnect');
const cors = require('cors');


mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res)=>{
    res.send("Hello from other side");
});
app.use('/api/user', require('./routes/user'))
app.use('/api/class', require('./routes/class'))
app.use('/api/review', require('./routes/review'))


app.listen(port, ()=>{
    console.log(`Listning at http://localhost:${port}`)
})