const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=>{
   res.status(200).json({
    message:'it is get /proudts'
   });
});

router.post('/',(req, res, next)=>{
    const proudct ={
        name : req.body.name,
        price : req.body.price
    }
    res.status(201).json({
     message :'it is post proudts',
     created : proudct 
    });
  
 });

 router.get('/:Idproudcts',(req, res, next)=>{
    const id = req.params.prroudctsid;
    if (id === 'spaical') {
        res.status(200).json({
            message : 'spical id is discoverd',
            id : id
        })
    } else {
        res.status(200).json({
            message: 'Your Id is passed '
        })
    }
 });

 router.patch('/:Idproudcts',(req, res, next)=>{
   res.status(200).json({
       message : 'Updated!'
   })
 });
 router.delete('/:Idproudcts',(req, res, next)=>{
    res.status(200).json({
        message : 'Deleted!'
    })
  });


 module.exports = router;
