const {Schema,model} = require('mongoose');

const libroSchema = new Schema({
    titulo: {type:String},
    fechaPublicacion: {type:Date},
    autor: {type:String},
    valoracionPromedio: {type:Number},
    descripcion: {type:String},
    paginas: {type:Number},
})

module.exports = model('libro', libroSchema)