const {Schema,model} = require('mongoose');

const lectorSchema = new Schema({
    nombre: {type:String},
    usuario: {type:String},
    correo: {type:String},
    ciudad: {type:String},
    imagen: {type:String},
    contraseña: {type:String},
    leidos: [{idBook:{type:String},
              fechaTerminoLeer:{type:String}}]
})

module.exports = model('lector', lectorSchema)