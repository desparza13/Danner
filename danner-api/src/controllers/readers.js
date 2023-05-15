const model = require('../models/reader');
require('dotenv').config();
const bcrypt = require('bcrypt');

const readerKey = process.env.READER_KEY;
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

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
        if(req.body.password){
            updatedReader.password= bcrypt.hashSync(req.body.password,10);
        }else{
            delete updatedReader.password;
        }
        model.findByIdAndUpdate(id, updatedReader, {new:true})
            .then(reader=>{
                res.status(200).send(reader);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    login:(req,res)=>{
        const password = req.body.password;

        model.findOne({
            email: req.body.email
        }).then(response=> {
            const payload = {
                id: response._id,
                name: response.name,
                email: response.email,
                user: response.user,
                role: "reader"
            }
            if(bcrypt.compareSync(password,response.password)){
                try{
                    const token = jwt.sign(payload,readerKey);
                    res.status(201).send({token:token,id:response._id});
                }catch(err){
                    res.status(500).send('Something went wrong'+ err);
                }
            }else{
                res.status(404).send('Something went wrong'+ error);
            }
            // if(response) {
            //     const payload = {
            //         id: response._id,
            //         name: response.name,
            //         email: response.email,
            //         user: response.user,
            //         role: "reader"
            //     }
            //     // Si encontro al usuario, generamos el token\
            //     const token = jwt.sign(payload, readerKey);
                
            //     res.status(200).send({token:token,id:response._id});
            // } 
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
    },
    googleLogin: (req, res)=>{
        const idToken = req.body.googleToken;
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            // Buscar el usuario, obtener el ID, generar el token con JWT y responder el token
            model.findOne({
                email: user.email
            }).then(response=> {
                if(response) {
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
                    let newReader = {
                        name: user.name,
                        user: user.given_name,
                        email: user.email,
                        city: "Unknown",
                        image: user.picture,
                        password: user.jti,
                        read: [],
                        toBeRead: [],
                        reading:[],
                        friends:[],
                        readingChallenge: 1
                    };
                    model(newReader).save()
                        .then(reader=>{
                            res.status(200).send(reader);
                        })
                        .catch(error=>{
                            res.status(400).send('Something went wrong '+error);
                    })
                }
            })
        }).catch(err => {
            res.status(401).send({ msg: 'token invalido' });
        });
    }
}
module.exports = ReadersController;