const  connect  = require("./Connection");


function Details(id,res,req){

    if(id!==undefined &&id !=="")
    {
        const sql = `SELECT * FROM cars where id_car_random ='${id}'`
        const sql2  =`SELECT tele1,tele2,email,location from users`;
        connect.query(sql,(err,data)=>{
            if(!err && data.length !==0){
                connect.query(sql2,(err2,data2)=>{
                    if(!err2)
                    {
                        console.log(data2);
                        if(req.session.user)
                        res.render('Cars_details',{ data:data[0],auth:req.session.user,conn:true})
                        else
                        res.render('Cars_details',{ data:data[0],auth:data2[0],conn:false})
                    }else{
                        res.redirect('/');
                    }
                })
            }else{
                res.redirect('/');
            }})}
}
module.exports = Details