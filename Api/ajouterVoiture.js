const qrCode = require("../qrcode");
const qr = require('qrcode');
const  connect  = require("./Connection");
const fs = require('fs');
const path = require("path");




  async function Voiture (req,res){
    
    const date = new Date().toString().substring(3,24);
    const id = Math.floor(Math.random()*100000000000000);
    const sql =`
    INSERT INTO cars( id_car_random, qr_code, agent, service, saisie, car, oil, kilo, next_kilo, matricule, teleC, date,img_qrcode) 
    VALUES ('${id}','${id+'.png'}','${req.body.agent}','${req.body.service}','${req.body.saisie}',
    '${req.body.car}','${req.body.oil}','${req.body.kilo}','${req.body.nextKilo}',
    '${req.body.matr}','${req.body.tele}','${date}',?)
    `
    try {
        
        const qrCode_Image = await qr.toString(""+id, { type: 'svg' });
        const imageData = Buffer.from(qrCode_Image);
    const {tele,agent,car,oil,matr,kilo,saisie,service,nextKilo} = req.body;
    if(!isNaN(parseInt(tele)) && agent && car && oil && kilo && service && nextKilo&&saisie)
    {
        if(tele.length ==10 && tele.charAt(0) =='0'){
        
            connect.query(sql,[imageData],(err,data)=>{
                if(err)
                throw err
                else{
                    res.redirect(`/details/${id}`);
                }
            })
    
    }
        }
      else{
            res.render("addCar",{err:true})
        }

    } catch (error) {
        console.log(error);   
    }
    
}
module.exports = Voiture
