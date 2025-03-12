const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url)
    .then(()=>{
        console.log('mongo db connected.....');
    }).catch((err)=>{
        console.log('error while connect with mongo db.');
    })