
const modelo = require('./../models/review');
const reviewsController={
    listar:(req, res)=>{
        modelo.find({})
            .then(reviews=>{
                res.status(200).send(reviews);
            })
            .catch(error=>{
                res.status(400).send('Algo salio mal');
            });
    },
    ver:(req,res)=>{
        const id = req.params.id;
        modelo.findById(id)
            .then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('No se encontró la review con id '+id);
            })
    },
    crear:(req,res)=>{
        let reviewNuevo = {
            idLibro: req.body.idLibro,
            idUsuario: req.body.idUsuario,
            puntaje:req.body.puntaje,
            descripcion:req.body.descripcion
        };
        modelo(reviewNuevo).save()
            .then(review=>{
                res.status(201).send(review);
            })
            .catch(error=>{
                res.status(400).send('No se pudo crear la review del libro con id '+ reviewNuevo.idLibro);
            })
    },
    actualizar:(req,res)=>{
        const id = req.params.id;
        let reviewActualizado = {
            idLibro: req.body.idLibro,
            idUsuario: req.body.idUsuario,
            puntaje:req.body.puntaje,
            descripcion:req.body.descripcion
        };
        modelo.findByIdAndUpdate(id, reviewActualizado, {new:true})
            .then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('No se pudo actualizar la review con id '+id);
            })
    },
    eliminar:(req,res)=>{
        const id = req.params.id;
        modelo.findByIdAndDelete(id)
            .then(review=>{
                res.status(200).send(review);
            })
            .catch(error=>{
                res.status(400).send('No se encontró para eliminar la review con id '+id);
            })
    }
}
module.exports = reviewsController;