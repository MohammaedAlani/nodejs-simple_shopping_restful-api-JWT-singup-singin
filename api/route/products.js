const express = require('express');
const router = express.Router();
const Proudct = require('../model/prodcts')
const mongoos = require('mongoose');
const multer = require('multer');
const cheakAuth = require('../middleware/cheak-auth');
const ProudctControler = require('../controller/prudcts');

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

router.get('/', ProudctControler.proudcts_get_all);

router.post('/', cheakAuth, upload.single('productImage') , ProudctControler.proudcts_create_proudct);

router.get('/:Idproudcts',cheakAuth,ProudctControler.proudcts_get_proudct);

router.patch('/:Idproudcts',cheakAuth, ProudctControler.proudcts_update_proudct);

router.delete('/:Idproudcts',cheakAuth,(req, res, next)=>{
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
