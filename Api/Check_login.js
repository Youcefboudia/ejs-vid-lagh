const connect =  require('./Connection')

function Check_connect(req,res){
    const username = req.body.user;
    const password = req.body.pass;
    const sql =`SELECT * FROM users WHERE username ='${req.body.user}' and password = '${req.body.pass}'`;
    if(req.body !=={}){

        if((username !=='=undefined') && (password !=='=undefined'))
        {
            connect.query(sql,async (err,rows)=>{
                
                if(err || rows.length ==0)
                res.render('login',{Connect:true})
                else{
                    req.session.user = rows[0];
                    res.redirect(`/`)
                }
            })  
        }
    }else{
        res.render('login',{Connect:true})
    }
}

module.exports= Check_connect