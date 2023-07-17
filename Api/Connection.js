const mysql = require('mysql')
require('dotenv').config()

const connect= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
if(!connect){
    console.log("connect");
}

module.exports =connect