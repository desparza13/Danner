const {Schema,model} = require('mongoose');
const bcrypt = require('bcrypt');

const authorSchema = new Schema({
    name: {type:String, required:true},
    user: {type:String, required:true},
    email: {type:String, required:true},
    city: {type:String, required:true},
    image: {type:String},
    password: {type:String, required:true}
})

authorSchema.pre('save', function(next) {//antes de que se haga un save se encripta la contraseña
    let author = this;
    author.password = bcrypt.hashSync(author.password, 10);
    next();
})
module.exports = model('author', authorSchema)