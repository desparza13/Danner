const {Schema,model} = require('mongoose');

const readerSchema = new Schema({
    name: {type:String, required:true},
    user: {type:String, required:true},
    email: {type:String, required:true},
    city: {type:String, required:true},
    image: {type:String},
    password: {type:String, required:true},
    read: [{bookId:{type:String},
            finishedDate:{type:Date,default:Date.now}}],
    toBeRead: [{type:String}],
    reading: [{bookId:{type:String},
            progress:{type:Number}}],
    friends: [{type:String}]
})

module.exports = model('readers', lectorSchema)