
const model = require('./../models/review');
const ReviewsController={
    list:(req, res)=>{
        model.find({}).populate([
            {path: 'bookId',model:'book'},
            {path: 'userId', model:'reader'},
            {path: 'likes',model:'reader'}
        ]).then(reviews=>{
                res.status(200).send(reviews);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            });
    },
    see:(req,res)=>{
        const id = req.params.id;
        model.findById(id).populate([
            {path: 'bookId',model:'book'},
            {path: 'userId', model:'reader'},
            {path: 'likes',model:'reader'}
        ]).then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    create:(req,res)=>{
        let newReview = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            rating:req.body.rating,
            description:req.body.description,
            likes: req.body.likes
        };
        model(newReview).save().then(review=>{
                res.status(201).send(review);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    update:(req,res)=>{
        const id = req.params.id;
        let updatedReview = {
            bookId: req.body.bookId,
            userId: req.body.userId,
            rating:req.body.rating,
            description:req.body.description,
            likes: req.body.likes

        };
        model.findByIdAndUpdate(id, updatedReview, {new:true})
            .then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    delete:(req,res)=>{
        const id = req.params.id;
        model.findByIdAndDelete(id)
            .then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    }
}
module.exports = ReviewsController;