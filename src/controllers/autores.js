
const modelo = require('./../models/autor');
const AutoresController={
    listar:(req, res)=>{
        modelo.find({})
            .then(autores=>{
                res.status(200).send(autores);
            })
            .catch(error=>{
                res.status(400).send('Algo salio mal');
            });
    },
    ver:(req,res)=>{
        const id = req.params.id;
        modelo.findById(id)
            .then(autor=>{
                res.status(200).send(autor);
            })
            .catch(error=>{
                res.status(400).send('No se encontró el autor con id '+id);
            })
    },
    crear:(req,res)=>{
        let autorNuevo = {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            correo: req.body.correo,
            ciudad: req.body.ciudad,
            imagen: req.body.imagen,
            contraseña: req.body.contraseña
        };
        modelo(autorNuevo).save()
            .then(autor=>{
                res.status(201).send(autor);
            })
            .catch(error=>{
                res.status(400).send('No se pudo crear el autor con usuario '+autorNuevo.usuario);
            })
    },
    actualizar:(req,res)=>{
        const id = req.params.id;
        let autorActualizado = {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            correo: req.body.correo,
            ciudad: req.body.ciudad,
            imagen: req.body.imagen,
            contraseña: req.body.contraseña
        };
        modelo.findByIdAndUpdate(id, autorActualizado, {new:true})
            .then(autor=>{
                res.status(200).send(autor);
            })
            .catch(error=>{
                res.status(400).send('No se pudo actualizar el autor con id '+id);
            })
    },
    eliminar:(req,res)=>{
        const id = req.params.id;
        modelo.findByIdAndDelete(id)
            .then(autor=>{
                res.status(200).send(autor);
            })
            .catch(error=>{
                res.status(400).send('No se encontró para eliminar el autor con id '+id);
            })
    }
}
module.exports = AutoresController;