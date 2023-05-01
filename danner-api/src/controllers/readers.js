const model = require('../models/reader');
require('dotenv').config();
const authorKey = process.env.AUTHOR_KEY;
const ReadersController={
    list:(req, res)=>{
        model.find({})
            .then(readers=>{
                res.status(200).send(readers);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            });
    },
    see:(req,res)=>{
        const id = req.params.id;
        model.findById(id).populate([
            {path: 'friends', model: 'reader'},
            {path: 'toBeRead', model: 'book'},
            {path: 'read.bookId', model: 'book'},
            {path: 'reading.bookId', model: 'book'}
        ])
            .then(reader=>{
                res.status(200).send(reader);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    create:(req,res)=>{
        let newReader = {
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            city: req.body.city,
            image: req.body.image,
            password: req.body.password,
            read: req.body.read,
            toBeRead: req.body.toBeRead,
            reading:req.body.reading,
            friends:req.body.friends,
            readingChallenge:req.body.readingChallenge
        };
        model(newReader).save()
            .then(reader=>{
                res.status(201).send(reader);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    update:(req,res)=>{
        const id = req.params.id;
        let updatedReader = {
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            city: req.body.city,
            image: req.body.image,
            password: req.body.password,
            read: req.body.read,
            toBeRead: req.body.toBeRead,
            reading:req.body.reading,
            friends: req.body.friends,
            readingChallenge:req.body.readingChallenge
        };
        model.findByIdAndUpdate(id, updatedReader, {new:true})
            .then(reader=>{
                res.status(200).send(reader);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    delete:(req,res)=>{
        const id = req.params.id;
        model.findByIdAndDelete(id)
            .then(reader=>{
                res.status(200).send(reader);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    login:(req,res)=>{
        model.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(response=> {
            if(response) {
                // Si encontro al usuario, generamos el token\
                const token = jwt.sign({
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    user: response.user
                }, authorKey);
                res.send({token});
            } else {
                //si no se encuentra
                res.send(400).send('Something went wrong'+ error);
            }
        })
        .catch(response => {
            res.send(400).send('Something went wrong'+ error);

        });
    }
}
module.exports = ReadersController;