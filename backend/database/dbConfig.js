require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("Database Connected!");
}).catch ((e) => {
    console.log("No Connection", e);
})

