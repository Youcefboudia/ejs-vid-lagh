const qr = require('qrcode');
const fs = require('fs');
const  connect  = require('./Api/Connection');



function qrCode(req,id,res){
  
if(id !==undefined && id!==''){
  const sql = `SELECT * FROM cars where id_car_random = '${id}'`;
  const qrCodeImage = `views/Img/${id}.png`;
  connect.query(sql,(err,rows)=>{
    if(!err && rows.length !==0){
    qr.toFile(qrCodeImage, `${req.hostname}/details/${id}`);
    res.redirect(`/details/${id}`);}
    else{
      res.redirect('/')
    }
  })
}
}


module.exports = qrCode

