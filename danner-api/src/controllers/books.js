const model = require('../models/book');
const BooksController={
    list:(req, res)=>{
        model.find({})
            .then(books=>{
                res.status(200).send(books);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            });
    },
    see:(req,res)=>{
        const id = req.params.id;
        model.findById(id)
            .then(book=>{
                res.status(200).send(book);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    create:(req,res)=>{
        let newBook = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            author: req.body.author,
            averageRating: req.body.averageRating,
            description: req.body.description,
            pages: req.body.pages,
            genre: req.body.genre
        };
        model(newBook).save()
            .then(book=>{
                res.status(201).send(book);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    update:(req,res)=>{
        const id = req.params.id;
        let updatedBook = {
            title: req.body.title,
            date: req.body.date,
            image: req.body.image,
            author: req.body.author,
            averageRating: req.body.averageRating,
            description: req.body.description,
            pages: req.body.pages,
            genre: req.body.genre
        };
        model.findByIdAndUpdate(id, updatedBook, {new:true})
            .then(book=>{
                res.status(200).send(book);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    delete:(req,res)=>{
        const id = req.params.id;
        model.findByIdAndDelete(id)
            .then(book=>{
                res.status(200).send(book);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    }
}
module.exports = BooksController;