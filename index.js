const express = require('express');
const port = 5000;
const mongoConnect = require('./database/mongoConnect');
const cors = require('cors');


mongoConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user'))
app.use('/api/class', require('./routes/class') )


app.listen(port, ()=>{
    console.log(`Listning at http://localhost:${port}`)
})