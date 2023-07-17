const mysql = require('mysql')

const connect= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
})
if(!connect){
    console.log("connect");
}

module.exports =connect