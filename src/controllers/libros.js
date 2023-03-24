
const modelo = require('./../models/libro');
const librosController={
    listar:(req, res)=>{
        modelo.find({})
            .then(libros=>{
                res.status(200).send(libros);
            })
            .catch(error=>{
                res.status(400).send('Algo salio mal');
            });
    },
    ver:(req,res)=>{
        const id = req.params.id;
        modelo.findById(id)
            .then(libro=>{
                res.status(200).send(libro);
            })
            .catch(error=>{
                res.status(400).send('No se encontró el libro con id '+id);
            })
    },
    crear:(req,res)=>{
        let libroNuevo = {
            titulo: req.body.titulo,
            fechaPublicacion: req.body.fechaPublicacion,
            autor: req.body.autor,
            valoracionPromedio: req.body.valoracionPromedio,
            descripcion: req.body.descripcion,
            paginas: req.body.paginas
        };
        modelo(libroNuevo).save()
            .then(libro=>{
                res.status(201).send(libro);
            })
            .catch(error=>{
                res.status(400).send('No se pudo crear correctamente el libro con título' + libroNuevo.titulo);
            })
    },
    actualizar:(req,res)=>{
        const id = req.params.id;
        let libroActualizado = {
            titulo: req.body.titulo,
            fechaPublicacion: req.body.fechaPublicacion,
            autor: req.body.autor,
            valoracionPromedio: req.body.valoracionPromedio,
            descripcion: req.body.descripcion,
            paginas: req.body.paginas
        };
        modelo.findByIdAndUpdate(id, libroActualizado, {new:true})
            .then(libro=>{
                res.status(200).send(libro);
            })
            .catch(error=>{
                res.status(400).send('No se pudo actualizar el libro con id '+id);
            })
    },
    eliminar:(req,res)=>{
        const id = req.params.id;
        modelo.findByIdAndDelete(id)
            .then(libro=>{
                res.status(200).send(libro);
            })
            .catch(error=>{
                res.status(400).send('No se encontró para eliminar el libro con id '+id);
            })
    }
}
module.exports = librosController;