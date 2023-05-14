const {Schema,model} = require('mongoose');

const authorSchema = new Schema({
    name: {type:String, required:true},
    user: {type:String, required:true},
    email: {type:String, required:true},
    city: {type:String, required:true},
    image: {type:String},
    password: {type:String, required:true}
})

module.exports = model('author', authorSchema)