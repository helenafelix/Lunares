const express = require('express');

const {engine} = require('express-handlebars');


//mysql
const mysql =require('mysql2');


const app = express();



//pra receber os dados
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//bootsrap
app.use('/bootstrap',express.static('./node_modules/bootstrap/dist'));

//configuraçao 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


//conexao
const conexao = mysql.createConnection({
host:'localhost',
user:'root',
password:'ana03ifpe',
database:'lunares'
});




conexao.connect(function(erro){
  if(erro) throw erro;
  console.log('deu certo')
});


//salas
app.get('/salas', function (req, res) {
  let sql = 'select * from salas';

  conexao.query(sql, function(erro,retorno){
     if (erro) throw erro;
 res.render('salas', {salas:retorno})
  });
  
});



  
//add uma sala

app.post("/salas/add", (req, res) => {
  const { sala, disponivel, capacidade } = req.body;
  conexao.query(

    "insert into salas (sala, disponivel, capasidade) values (?, ?, ?)",
    [sala, disponivel === "on" ? 1 : 0, capacidade],
    (erro) => {
      if (erro) throw erro;
      res.redirect("/salas");
    }
  );
});








//disciplinas
app.get('/disciplinas', function (req, res) {
  let sql = 'select * from disciplina ';

  conexao.query(sql, function(erro,retorno){
     if (erro) throw erro;
 res.render('disciplinas', {disciplinas:retorno})
  });
  
});







//horarios
app.get('/horarios', function (req, res) {
  let sql = 'select * from horarios ';

  conexao.query(sql, function(erro,retorno){
     if (erro) throw erro;
 res.render('horarios', {horarios:retorno})
  });
  
});



app.engine('handlebars', engine({
    defaultLayout: 'main'
}));

app.listen(
    3000, 
    () => console.log(`Servidor em execução`)
);
