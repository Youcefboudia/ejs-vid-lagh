const qrCode = require("../qrcode");
const  connect  = require("./Connection");




function Voiture (req,res){
    const date = new Date().toString().substring(3,24);
    const id = Math.floor(Math.random()*100000000000000);
    const sql =`
    INSERT INTO cars( id_car_random, qr_code, agent, service, saisie, car, oil, kilo, next_kilo, matricule, teleC, date) 
    VALUES ('${id}','${id+'.png'}','${req.body.agent}','${req.body.service}','${req.body.saisie}',
    '${req.body.car}','${req.body.oil}','${req.body.kilo}','${req.body.nextKilo}',
    '${req.body.matr}','${req.body.tele}','${date}')
    `
    connect.query(sql,(err,rows)=>{
        if(!err &&rows.length !==0)
        qrCode(req,id,res);
    })
    
}
module.exports = Voiture