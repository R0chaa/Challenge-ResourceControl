const mongoose = require("mongoose")

const Schema = mongoose.Schema;

// Configurando o mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/desafio', { 
    useNewUrlParser: true 
}).then(() => {
    console.log("Mongobd Conectado...");
}).catch((error) => {
    console.log("Houve um erro: " + error);
})

//Model- Usuarios
//definindo model
//const UsuarioSchema = mongoose.schema({

const UsuarioSchema = new Schema({
        
    nome: {
            type: String,
            require: true
    },

    tipo: {
            type: String,
            require: true
    },

    data: {
            type: String,
    }      
})

//collection

const Usuario = mongoose.model('usuarios', UsuarioSchema)

module.exports = Usuario;