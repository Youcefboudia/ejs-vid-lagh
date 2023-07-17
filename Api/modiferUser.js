const connect = require("./Connection");
const Modifer = require("./modifer");

function ModiferUser(req,res){

    console.log();
    if(req.body.username && req.body.password)
    {
        const sql = `UPDATE users SET username='${req.body.username}',password='${req.body.password}',
            tele1 = '${req.body.tele1}' ,tele2 = '${req.body.tele2}',agent = '${req.body.agent}'
            ,location = '${req.body.location}',email = '${req.body.email}',nom = '${req.body.nom}'
            ,service = '${req.body.service}'`;
        console.log(sql);
        connect.query(sql,(err,data)=>{
            if(!err)
            {
                Modifer(req,res);
            }else{
                throw err
                res.redirect('/modifer')
            }
        })

    }
}
module.exports = ModiferUser