const {Schema,model} = require('mongoose');

const lectorSchema = new Schema({
    nombre: {type:String},
    usuario: {type:String},
    correo: {type:String},
    ciudad: {type:String},
    imagen: {type:String},
    contraseña: {type:String},
    leidos: [{idBook:{type:String},
              fechaTerminoLeer:{type:Date}}],
    porLeer: [{idBook:{type:String}}],
    leyendo: [{idBook:{type:String},
              progreso:{type:Number}}],
    amigos: [{idUsuario:{type:String}}]

})

module.exports = model('lectore', lectorSchema)