require("dotenv").config()
const mongoose = require('mongoose');

const { DB_CONECTION } = process.env;

mongoose.connect(DB_CONECTION)
.then(() => {
    console.log('Database connected succesfuly');
}).catch(err => {
    console.log(err)
});

module.exports = mongoose;
