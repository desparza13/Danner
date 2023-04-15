
const modelo = require('./../models/solicitudesAmistad');
const solicitudesController={
    listar:(req, res)=>{
        modelo.find({})
            .then(solicitudes=>{
                res.status(200).send(solicitudes);
            })
            .catch(error=>{
                res.status(400).send('Algo salio mal');
            });
    },
    ver:(req,res)=>{
        const id = req.params.id;
        modelo.findById(id)
            .then(solicitud=>{
                res.status(200).send(solicitud);
            })
            .catch(error=>{
                res.status(400).send('No se encontró la solicitud con id '+id);
            })
    },
    crear:(req,res)=>{
        let solicitudNuevo = {
            idUsuarioEnvio: req.body.idUsuarioEnvio,
            idUsuarioRecepcion: req.body.idUsuarioRecepcion,
            estadoSolicitud:req.body.estadoSolicitud
        };
        modelo(solicitudNuevo).save()
            .then(solicitud=>{
                res.status(201).send(solicitud);
            })
            .catch(error=>{
                res.status(400).send('No se pudo crear la solicitud al usuario con id '+ solicitudNuevo.idUsuarioRecepcion);
            })
    },
    actualizar:(req,res)=>{
        const id = req.params.id;
        let solicitudActualizado = {
            idUsuarioEnvio: req.body.idUsuarioEnvio,
            idUsuarioRecepcion: req.body.idUsuarioRecepcion,
            estadoSolicitud:req.body.estadoSolicitud
        };
        modelo.findByIdAndUpdate(id, solicitudActualizado, {new:true})
            .then(solicitud=>{
                res.status(200).send(solicitud);
            })
            .catch(error=>{
                res.status(400).send('No se pudo actualizar la solicitud con id '+id);
            })
    },
    eliminar:(req,res)=>{
        const id = req.params.id;
        modelo.findByIdAndDelete(id)
            .then(solicitud=>{
                res.status(200).send(solicitud);
            })
            .catch(error=>{
                res.status(400).send('No se encontró para eliminar la solicitud con id '+id);
            })
    }
}
module.exports = solicitudesController;