const { Product } = require('../models/product')
const { Category } = require('../models/category')
const express = require('express');
const router = express.Router();

// router.get(`/`,(req, res)=>{
//     const product = {
//         id:1,
//         name:'hair dresser',
//         image:'some/url'
//     }
//     res.send(product)
// })

router.get(`/promise`, (req, res) => {
    const productList = Product.find().then((products) => {
        res.status(201).json({ products })
    }).catch((err) => {
        res.status(501).json({
            error: err,
            success: false
        })
    })
})

router.get(`/`, async(req, res) => {
    const productList = await Product.find().select("name category");
    if (!productList) {
        res.status(201).json({
            success: false
        })
    }
    res.status(201).json(productList)
})

router.get(`/:id`, async(req, res) => {
    const productList = await Product.findById(req.params.id).populate("category").select("name");
    if (!productList) {
        res.status(201).json({
            success: false
        })
    }
    res.status(201).json(productList)
})

router.post(`/`, async(req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if (!product)
        return res.status(500).send('The product cannot be created')

    res.send(product);
})

module.exports = router;