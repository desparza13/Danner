const {Schema,model} = require('mongoose');

const autorSchema = new Schema({
    nombre: {type:String, required:true},
    usuario: {type:String, required:true},
    correo: {type:String, required:true},
    ciudad: {type:String, required:true},
    imagen: {type:String},
    contraseña: {type:String, required:true}
})

module.exports = model('autores', autorSchema)