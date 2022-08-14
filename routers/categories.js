const { Category } = require('../models/category')
const express = require('express');
const router = express.Router();

router.get(`/`, async(req, res) => {
    const categoryList = await Category.find().select('name')
    if (!categoryList) {
        res.status(501).json({
            success: false
        })
    }
    res.status(201).json(categoryList)
})

router.get(`/:id`, async(req, res) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        res.status(501).json({
            success: false,
            message: "Catagory not found"
        })
    }
    res.status(201).json(category)
})

router.put('/:id', async(req, res) => {
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    }, { new: true })
    if (!category)
        return res.status(404).send('No category Found')

    res.status(200).send(category)
})

router.post('/', async(req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if (!category)
        return res.status(404).send('No category created')

    res.status(200).send(category)
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id).then((catagory) => {
        if (catagory) {
            return res.status(200).json({
                success: true,
                message: "catagory deleted"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "catagory NOT  deleted"
            })
        }
    }).catch(err => {
        return res.status(401).json({
            success: false,
            message: err
        })
    })

})

module.exports = router;