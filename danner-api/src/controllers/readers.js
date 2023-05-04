const model = require('../models/reader');
require('dotenv').config();
const readerKey = process.env.READER_KEY;
const jwt = require('jsonwebtoken');

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
    login:(req,res)=>{
        console.log(req.body);
        model.findOne({
            email: req.body.email,
            password: req.body.password
        }).then(response=> {
            console.log(response)
            if(response) {
                console.log('A');
                const payload = {
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    user: response.user,
                    role: "reader"
                }
                // Si encontro al usuario, generamos el token\
                const token = jwt.sign(payload, readerKey);
                
                res.status(200).send({token:token,id:response._id});
            } else {
                //si no se encuentra
                res.status(400).send('Something went wrong');
            }
        })
        .catch(error => {
            res.status(400).send('Something went wrong'+ error);

        });
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
    }
}
module.exports = ReadersController;