const {Schema,model} = require('mongoose');

const libroSchema = new Schema({
    titulo: {type:String, required:true},
    fechaPublicacion: {type:Date, default:Date.now()},
    genero: {type:String, required:true},
    autor: {type:String, required:true},
    valoracionPromedio: {type:Number, default: 0},
    descripcion: {type:String, required:true},
    paginas: {type:Number, required:true}
})

module.exports = model('libro', libroSchema)