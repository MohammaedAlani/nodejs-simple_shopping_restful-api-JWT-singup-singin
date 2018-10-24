const express = require('express');

const router = express.Router();

router.get('/' , (req, res , next )=>{
    res.status(200).json({
        message : ' order was fetched'
    })
});

router.post('/' , (req, res, next)=>{
    const order ={
        proudctid : req.body.proudctid,
        qualty : req.body.qualty
    }
    res.status(201).json({
        message : 'order was created',
        Ordered : order
    });
});

router.get('/:orderid' , (req, res , next )=>{
    res.status(200).json({
        message : ' order detels',
        id : req.params.orderid,
    })
});

router.patch('/:orderid' , (req, res , next )=>{
    res.status(200).json({
        message : ' order updated',
        id : req.params.orderid,
    })
});

router.delete('/:orderid' , (req, res , next )=>{
    res.status(200).json({
        message : ' order delted',
        id : req.params.orderid,
    })
});


 module.exports = router;
