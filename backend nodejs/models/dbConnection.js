const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(()=>{
    console.log('Mongo DB is connected');
}).catch((err)=>{
    console.log('Error Connection Database',err);
})
