const {Schema,model} = require('mongoose');
const bcrypt = require('bcrypt');

const readerSchema = new Schema({
        name: {type:String, required:true},
        user: {type:String, required:true},
        email: {type:String, required:true},
        city: {type:String, required:true},
        image: {type:String,defafult:'https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png'},
        password: {type:String, required:true},
        read: [{bookId:{type:String},
                finishedDate:{type:Date,default:Date.now}}],
        toBeRead: [{type:String}],
        reading: [{bookId:{type:String},
                progress:{type:Number}}],
        friends: [{type:String}],
        readingChallenge: {type:Number}
})

readerSchema.pre('save', function(next) {//antes de que se haga un save se encripta la contraseña
        let reader = this;
        reader.password = bcrypt.hashSync(reader.password, 10);
        next();
    })
module.exports = model('reader', readerSchema)