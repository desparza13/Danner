const {Schema,model} = require('mongoose');

const reviewSchema = new Schema({
    bookId: {type:String, required:true},
    userId: {type:String, required:true},
    rating:{type:Number, required:true},
    description:{type:String}
})

module.exports = model('review', reviewSchema)