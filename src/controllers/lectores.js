
const modelo = require('./../models/lector');
const LectoresController={
    listar:(req, res)=>{
        modelo.find({})
            .then(lectores=>{
                res.status(200).send(lectores);
            })
            .catch(error=>{
                res.status(400).send('Algo salio mal');
            });
    },
    ver:(req,res)=>{
        const id = req.params.id;
        modelo.findById(id)
            .then(lector=>{
                res.status(200).send(lector);
            })
            .catch(error=>{
                res.status(400).send('No se encontró el lector con id '+id);
            })
    },
    crear:(req,res)=>{
        let lectorNuevo = {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            correo: req.body.correo,
            ciudad: req.body.ciudad,
            imagen: req.body.imagen,
            contraseña: req.body.contraseña,
            leidos: req.body.leidos,
            porLeer: req.body.porLeer,
            leyendo:req.body.leyendo,
            amigos:req.body.amigos
        };
        modelo(lectorNuevo).save()
            .then(lector=>{
                res.status(201).send(lector);
            })
            .catch(error=>{
                res.status(400).send(error);
            })
    },
    actualizar:(req,res)=>{
        const id = req.params.id;
        let lectorActualizado = {
            nombre: req.body.nombre,
            usuario: req.body.usuario,
            correo: req.body.correo,
            ciudad: req.body.ciudad,
            imagen: req.body.imagen,
            contraseña: req.body.contraseña,
            leidos: req.body.leidos,
            porLeer: req.body.porLeer,
            leyendo:req.body.leyendo,
            amigos: req.body.amigos
        };
        modelo.findByIdAndUpdate(id, lectorActualizado, {new:true})
            .then(lector=>{
                res.status(200).send(lector);
            })
            .catch(error=>{
                res.status(400).send('No se pudo actualizar el lector con id '+id);
            })
    },
    eliminar:(req,res)=>{
        const id = req.params.id;
        modelo.findByIdAndDelete(id)
            .then(lector=>{
                res.status(200).send(lector);
            })
            .catch(error=>{
                res.status(400).send('No se encontró para eliminar el lector con id '+id);
            })
    }
}
module.exports = LectoresController;