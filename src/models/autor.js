const {Schema,model} = require('mongoose');

const autorSchema = new Schema({
    nombre: {type:String},
    usuario: {type:String},
    correo: {type:String},
    ciudad: {type:String},
    imagen: {type:String},
    contraseña: {type:String}
})

module.exports = model('autor', autorSchema)