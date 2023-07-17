const express = require('express')
const Check_connect = require('./Api/Check_login');
const Auth = require('./Api/auth');
const Voiture = require('./Api/ajouterVoiture');
const Details = require('./Api/detailsCar');
const ListVoiture = require('./Api/getAllboiture');
const Modifer = require('./Api/modifer');
const ModiferUser = require('./Api/modiferUser');
const session = require('express-session');
const  connect  = require('./Api/Connection');
require('dotenv').config();

const app = express()


app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: false
}));



app.use(express.urlencoded({ extended: true }));

app.set('view engine',"ejs");
app.use(express.static(__dirname+'/views'))


app.get('/details/:iduser',function(req, res) {
    const id = req.params.iduser;
    if(id !==undefined)
    Details(id,res,req)
  });

app.get('/',Auth, function(req, res) {
    ListVoiture(req,res);
  });
app.post('/',Auth, function(req, res) {
    ListVoiture(req,res);
  });

  app.get('/ajouter',Auth,(req,res)=>{
    res.render('addCar')
  })

app.get('/login', function(req, res) {
    res.render('login',{Connect :false})
  });
app.post('/login', function(req, res) {
  
  Check_connect(req,res);
  });
app.post('/addCar', function(req, res) {
  Voiture(req,res)
  });

  app.get('/modifer',Auth,function(req,res){
    Modifer(req,res)
  });
  app.post('/modiferUser',  function(req,res){
  ModiferUser(req,res)
  });
  app.post('/delete/:id',  function(req,res){
    const sql = `DELETE FROM cars where id_car_random = ?`
    connect.query(sql,[req.params.id],(err,data)=>{
      if(err) throw err})
      res.redirect('/')
  });

  app.use('/qrcodes', express.static('qrcodes'));
app.listen(process.env.PORT,()=>console.log(`http://localhost:${process.env.PORT}`))