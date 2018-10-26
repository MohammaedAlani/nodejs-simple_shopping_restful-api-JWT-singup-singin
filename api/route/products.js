const express = require('express');
const router = express.Router();
const Proudct = require('../model/prodcts')
const mongoos = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function (req , file , cb) {
      cb(null, './uploads/');  
    },
    filename : function (req , file , cb) {
     cb(null, new Date().toISOString() + file.originalname);   
    }
});

const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true) 
    } else {
        cb(null, false)
    } 
}; 

const upload = multer({
    storage : storage,
    fileFilter : fileFilter
});

router.get('/',(req, res, next)=>{
    Proudct.find().select('name price _id productImage').exec().then(docs =>    
        { const response = { proudct : docs.map(doc =>{
            return { name : doc.name , price : doc.price , productImage :doc.productImage, _id : doc._id,  type:'GET', url : 'http://localhost:3000/proudcts/' + doc._id }
        }) }; if (docs.length >= 0) {
        res.status(200).json(response)
    } else {
        res.status(404).json({message : 'No Proudcts More'})
    }}).catch( err => {res.status(500).json({error : err})});
});

router.post('/',upload.single('productImage') ,(req, res, next)=>{
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
 });

 router.get('/:Idproudcts',(req, res, next)=>{
    const id = req.params.Idproudcts;
    Proudct.findById(id).exec().then(doc =>{if (doc) {
        res.status(200).json(doc)
    } else {
        res.status(404).json({message : 'NO Vaild id is enter' })
    }
    }).catch(err =>{ res.status(500).json({error : err}) });
    });

 router.patch('/:Idproudcts',(req, res, next)=>{
    const id = req.params.Idproudcts;
    const updatedOps = {};
    for (const ops of req.body) {
        updatedOps[ops.propName] = ops.value
    }
    Proudct.update( {_id : id },{$set : updatedOps}).exec().then(result => { res.status(200).json(result) }).catch(err => { res.status(500).json({error : err}) });
    
 });
 router.delete('/:Idproudcts',(req, res, next)=>{
    const id = req.params.Idproudcts;
    Proudct.remove({_id : id}).exec().then( status=>{
        res.status(200).json(status)
    } ).catch(err =>{
        res.status(500).json({
            error:err
        })
    });
  });



 
 module.exports = router;
