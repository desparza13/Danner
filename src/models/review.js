const {Schema,model} = require('mongoose');

const reviewSchema = new Schema({
    idLibro: {type:String, required:true},
    idUsuario: {type:String, required:true},
    puntaje:{type:Number, required:true},
    descripcion:{type:String}
})

module.exports = model('review', reviewSchema)