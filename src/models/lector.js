const {Schema,model} = require('mongoose');

const lectorSchema = new Schema({
    nombre: {type:String, required:true},
    usuario: {type:String, required:true},
    correo: {type:String, required:true},
    ciudad: {type:String, required:true},
    imagen: {type:String},
    contraseña: {type:String, required:true},
    leidos: [{idBook:{type:String},
            fechaTerminoLeer:{type:Date}}],
    porLeer: [{idBook:{type:String}}],
    leyendo: [{idBook:{type:String},
            progreso:{type:Number}}],
    amigos: [{idUsuario:{type:String}}]

})

module.exports = model('lectore', lectorSchema)