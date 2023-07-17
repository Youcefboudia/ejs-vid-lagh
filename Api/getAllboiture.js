const  connect  = require("./Connection");

function ListVoiture(req,res){
    
    if(req.body.tele ==undefined || req.body.tele ==''){
        connect.query('SELECT * FROM cars order by id_car desc',(err,data)=>{
            if(!err)
            {
                res.render("home",{data:data});
            }
        })        
    }else{
        connect.query(`SELECT * FROM cars where teleC LIKE '%${req.body.tele}%' or car LIKE '%${req.body.tele}%' or matricule LIKE  '%${req.body.tele}%'
        or saisie LIKE '%${req.body.tele}%' 
        `,
        (err,data)=>{
            if(!err)
            {
                res.render("home",{data:data});
            }
})
}
}
module.exports = ListVoiture