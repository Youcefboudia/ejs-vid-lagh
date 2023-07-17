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
                        const imageData = data[0].img_qrcode;
                        const base64Image = Buffer.from(imageData).toString('base64');
                        const imageSrc = `data:image/svg+xml;base64,${base64Image}`;
                        
                        if(req.session.user)
                        res.render('Cars_details',{ data:data[0],auth:data2[0],conn:true,imageSrc})
                        else
                        res.render('Cars_details',{ data:data[0],auth:data2[0],conn:false,imageSrc})
                    }else{
                        res.redirect('/');
                    }
                })
            }else{
                res.redirect('/');
            }})}
}
module.exports = Details
