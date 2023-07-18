const qr = require('qrcode');
const fs = require('fs');
const  connect  = require('./Api/Connection');



function qrCode(req,id,res){
  
if(id !==undefined && id!==''){
  const sql = `SELECT * FROM cars where id_car_random = '${id}'`;
  
  connect.query(sql,(err,rows)=>{
    if(!err && rows.length !==0){
    
    res.redirect(`/details/${id}`);}
    else{
      res.redirect('/')
    }
  })
}
}

module.exports = qrCode

