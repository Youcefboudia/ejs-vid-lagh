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
    const {tele,agent,car,oil,matr,kilo,saisie,service,nextKilo} = req.body;
    if(!isNaN(parseInt(tele)) && agent && car && oil && kilo && service && nextKilo&&saisie)
    {
        if(tele.length ==10 && tele.charAt(0) =='0'){

            connect.query(sql,(err,rows)=>{
                if(!err &&rows.length !==0)
                qrCode(req,id,res);
            })
        }else{
            res.render('addCar',{err:true})
        }
    }else{
        res.render('addCar',{err:true})
    }
    
    
}
module.exports = Voiture