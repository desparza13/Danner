const {Schema,model} = require('mongoose');

const solicitudSchema = new Schema({
    idUsuarioEnvio: {type:String, required:true},
    idUsuarioRecepcion: {type:String, required:true},
    estadoSolicitud:{type:Boolean, default:false}
})

module.exports = model('solicitude', solicitudSchema)