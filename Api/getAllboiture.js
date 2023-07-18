const  connect  = require("./Connection");

function ListVoiture(req,res){
    
    if(req.body.tele ==undefined || req.body.tele ==''){
        connect.query('SELECT * FROM cars order by id_car desc',(err,data)=>{
            if(!err)
            {
                data.forEach(element => {
                    const imageData = element.img_qrcode;
                        const base64Image = Buffer.from(imageData).toString('base64');
                        const imageSrc = `data:image/svg+xml;base64,${base64Image}`;   
                        element.img_qrcode = imageSrc; 
                });
                
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
                const imageData = data[0].img_qrcode;
                        const base64Image = Buffer.from(imageData).toString('base64');
                        const imageSrc = `data:image/svg+xml;base64,${base64Image}`;
                        
                res.render("home",{data:data,imageSrc});
            }
})
}
}
module.exports = ListVoiture