const model = require('./../models/author');
require('dotenv').config();

const authorKey = process.env.AUTHOR_KEY;
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

const AuthorsController={
    list:(req, res)=>{
        model.find({})
            .then(authors=>{
                res.status(200).send(authors);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            });
    },
    see:(req,res)=>{
        const id = req.params.id;
        model.findById(id)
            .then(author=>{
                res.status(200).send(author);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    create:(req,res)=>{
        let newAuthor = {
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            city: req.body.city,
            image: req.body.image,
            password: req.body.password
        };
        model(newAuthor).save()
            .then(author=>{
                res.status(201).send(author);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    update:(req,res)=>{
        const id = req.params.id;
        let updatedAuthor = {
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            city: req.body.city,
            image: req.body.image,
            password: req.body.password
        };
        model.findByIdAndUpdate(id, updatedAuthor, {new:true})
            .then(author=>{
                res.status(200).send(author);
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
                const payload = {
                    id: response._id,
                    name: response.name,
                    email: response.email,
                    user: response.user,
                    role: "author"
                }
                // Si encontro al usuario, generamos el token\
                const token = jwt.sign(payload, authorKey);
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
            .then(author=>{
                res.status(200).send(author);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    googleLogin: (req, res)=>{
        const idToken = req.body.googleToken;
        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            console.log('Si se valido el token', user);
            // Buscar el usuario, obtener el ID, generar el token con JWT y responder el token
            model.findOne({
                email: user.email
            }).then(response=> {
                console.log(response)
                if(response) {
                    console.log("Encuentra")
                    const payload = {
                        id: response._id,
                        name: response.name,
                        email: response.email,
                        user: response.user,
                        role: "author"
                    }
                    // Si encontro al usuario, generamos el token\
                    const token = jwt.sign(payload, authorKey);
                    res.status(200).send({token:token,id:response._id});
                } else {
                    console.log("No encuentra")
                    //si no se encuentra
                    let newAuthor = {
                        name: user.name,
                        user: user.given_name,
                        email: user.email,
                        city: "Unknown",
                        image: user.picture,
                        password: user.jti
                    };
                    console.log("Nuevo autor", newAuthor)
                    model(newAuthor).save()
                        .then(author=>{
                            res.status(200).send(author);
                        })
                        .catch(error=>{
                            res.status(400).send('Something went wrong '+error);
                    })
                }
            })
        }).catch(err => {
            res.status(401).send({ msg: 'token invalido' });
        });
    },
    decode:(req,res)=>{
        console.log('Entre');
        const tok = req.body.token
        console.log(tok);
        var decoded = jwt.verify(tok, authorKey);
        if(decoded){
    
        console.log(decoded.role);
        res.status(200).send(decoded);
        }
    }
}
module.exports = AuthorsController;