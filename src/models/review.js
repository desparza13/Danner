const {Schema,model} = require('mongoose');

const reviewSchema = new Schema({
    idLibro: {type:String},
    idUsuario: {type:String},
    puntaje:{type:Number},
    descripcion:{type:String}
})

module.exports = model('review', reviewSchema)