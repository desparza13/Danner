
const model = require('../models/friendshipRequest');
const RequestsController={
    list:(req, res)=>{
        model.find({}).populate([
            {path:'idSender', model: 'reader'},
            {path:'idReceiver', model: 'reader'},
            
        ]).then(requests=>{
                res.status(200).send(requests);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            });
    },
    see:(req,res)=>{
        const id = req.params.id;
        model.findById(id)
            .then(request=>{
                res.status(200).send(request);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    create:(req,res)=>{
        let newRequest = {
            idSender: req.body.idSender,
            idReceiver: req.body.idReceiver,
            status:req.body.status
        };
        model(newRequest).save()
            .then(request=>{
                res.status(201).send(request);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    update:(req,res)=>{
        const id = req.params.id;
        let updatedRequest = {
            idSender: req.body.idSender,
            idReceiver: req.body.idReceiver,
            status:req.body.status
        };
        model.findByIdAndUpdate(id, updatedRequest, {new:true})
            .then(request=>{
                res.status(200).send(request);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    },
    delete:(req,res)=>{
        const id = req.params.id;
        model.findByIdAndDelete(id)
            .then(request=>{
                res.status(200).send(request);
            })
            .catch(error=>{
                res.status(400).send('Something went wrong '+error);
            })
    }
}
module.exports = RequestsController;