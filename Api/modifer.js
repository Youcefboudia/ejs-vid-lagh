const  connect  = require("./Connection");

function Modifer (req,res){

    const sql = `SELECT * FROM users `;
    
        connect.query(sql,(err,data)=>{
            if(!err)
            {
                res.render('modifer',{data:data[0]});
            }
        })
    
}
module.exports = Modifer