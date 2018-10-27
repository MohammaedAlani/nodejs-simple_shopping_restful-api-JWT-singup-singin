const Proudct = require('../model/prodcts')
const mongoos = require('mongoose');



exports.proudcts_get_all = (req, res, next)=>{
    Proudct.find().select('name price _id productImage').exec().then(docs =>    
        { const response = { proudct : docs.map(doc =>{
            return { name : doc.name , price : doc.price , productImage :doc.productImage, _id : doc._id,  type:'GET', url : 'http://localhost:3000/proudcts/' + doc._id }
        }) }; if (docs.length >= 0) {
        res.status(200).json(response)
    } else {
        res.status(404).json({message : 'No Proudcts More'})
    }}).catch( err => {res.status(500).json({error : err})});
};

exports.proudcts_create_proudct = (req, res, next)=>{
    const prodcts = new Proudct({
     _id  : new mongoos.Types.ObjectId(),
     name : req.body.name,
     price : req.body.price,
     productImage: req.file.path
    
    }); 
    prodcts.save()
     .then(result =>{  res.status(201).json({
     message : "proudcut is saved",
     proudct : prodcts});}).catch(err => { res.status(500).json({error : err}) })
};

exports.proudcts_get_proudct =(req, res, next)=>{
    const id = req.params.Idproudcts;
    Proudct.findById(id).exec().then(doc =>{if (doc) {
        res.status(200).json(doc)
    } else {
        res.status(404).json({message : 'NO Vaild id is enter' })
    }
    }).catch(err =>{ res.status(500).json({error : err}) });
};

exports.proudcts_update_proudct = (req, res, next)=>{
    const id = req.params.Idproudcts;
    const updatedOps = {};
    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value
    }
    Proudct.update( {_id : id },{$set : updatedOps}).exec().then(result => { res.status(200).json(result) }).catch(err => { res.status(500).json({error : err}) });
    
};