const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();

require('./config/db');

const PORT = process.env.PORT ||  8080;
app.use(bodyParser.json());
app.use('/api/v1', routes);

// app.use(express.json());
// app.post("/api/v1/register", (req, res) => {
//     res.status(200).json({ message: "User registered successfully!" });
// });

app.listen(PORT, () =>{
    console.log(`server is up and running on PORT : ${PORT}`);
});