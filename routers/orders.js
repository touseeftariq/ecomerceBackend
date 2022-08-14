const {Order} = require('../models/order')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res)=>{
    const orderList = await Order.find();
    if(!orderList){
        res.status(501).json({
            success: false
        })    
    }
    res.status(201).json(orderList)
})

router.post(`/`,(req, res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock
    })

    product.save().then((createdProduct)=>{
        res.status(201).json(createdProduct)
    }).catch((err)=>{
        res.status(501).json({
            error: err,
            success: false
        })
    })
})

module.exports = router;