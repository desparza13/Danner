const {Schema,model} = require('mongoose');

const solicitudSchema = new Schema({
    idUsuarioEnvio: {type:String},
    idUsuarioRecepcion: {type:String},
    estadoSolicitud:{type:Boolean}
})

module.exports = model('solicitud', solicitudSchema)