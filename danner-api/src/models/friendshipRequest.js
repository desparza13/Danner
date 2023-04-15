const {Schema,model} = require('mongoose');

const requestSchema = new Schema({
    idSender: {type:String, required:true},
    idReceiver: {type:String, required:true},
    status:{type:Boolean, default:false}
})

module.exports = model('requests', solicitudSchema)