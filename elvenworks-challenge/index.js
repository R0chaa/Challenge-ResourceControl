const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const app = express()
const mongoose = require("mongoose")
const Usuarios = require("./db.js")
const { db, findOne } = require("./db.js")
const Usuario = require("./db.js")
const NovoUsuario = mongoose.model('usuarios')
const porta = 8081

app.use(express.static("template"))
app.use(express.static("template/pags"))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) => {
  Usuarios.find().then((doc) => {
    res.render(__dirname + "/template/pags/listagem.ejs", {doc})
  }).catch((err) => {
    console.log("Erro: "+err);
  })
})

app.get("/cadastro", (req, res) => {
  res.render(__dirname + "/template/pags/cadastro.ejs")
})

app.post("/add", (req, res) => {
  new NovoUsuario({

    nome: req.body.name,
    tipo: req.body.tip,
    data: req.body.date

  }).save().then(() => {
    console.log ("Usuario criado com sucesso!")
    res.redirect("/")
  }).catch((err) => {
    console.log ("Houve erro ao criar o usuario: " +err)
  })
})

app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  
  Usuario.findById({_id: id}).then((doc) => {
    res.render(__dirname + "/template/pags/edit.ejs", {doc})
  })
})

app.post('/att/:id', (req, res) => {
  
  Usuario.updateOne(
    { "_id": req.params.id}, // Filter
    {
     "nome": req.body.nome,
     "tipo": req.body.tip,
     "data": req.body.date
    } // Update
  ).then(() => {
    console.log('Usuario atualizado!');
    res.redirect('/')
  }).catch((err) => {
    console.log('Erro: ' + err);
  })
})

app.route('/delete/:id').get((req, res) => {
  const id = req.params.id

  Usuarios.deleteOne({_id: id}, (err,result) => {
      if(err) return res.send(500, err)
          console.log('Deletado com sucesso!');
          res.redirect('/');
  })
})

app.listen(porta,() => {
  console.log('Servidor Rodando na porta: '+ porta);
});

//deletar: db.usuarios.remove({"id": "req.body.id"})
