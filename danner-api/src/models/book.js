const {Schema,model} = require('mongoose');

const bookSchema = new Schema({
    title: {type:String, required:true},
    date: {type:Date, default:Date.now()},
    image: {type:String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBe97jZk0iaa61yMK-ZOFiHiTAGTHTMSNSg&usqp=CAU"},
    genre: {type:String, required:true},
    author: {type:String, required:true},
    averageRating: {type:Number, default: 0},
    description: {type:String, required:true},
    pages: {type:Number, required:true}
})

module.exports = model('book', bookSchema)