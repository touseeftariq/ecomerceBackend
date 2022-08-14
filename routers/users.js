const { User } = require('../models/user')
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

router.get(`/`, async(req, res) => {
    const userList = await User.find().select("-passwordHash");
    if (!userList) {
        res.status(501).json({
            success: false
        })
    }
    res.status(201).json(userList)
})

router.get(`/:id`, async(req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
        res.status(501).json({
            success: false
        })
    }
    res.status(201).json(user)
})

router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return res.status(400).send('user not found')
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const secret = process.env.secret
        const token = jwt.sign({
                userId: user.id,
                isAdmin: isAdmin
            },
            secret, {
                expiresIn: '1d'
            })

        return res.status(200).send({ user: user.email, token: token })
    } else {
        return res.status(400).send("password is incorect")
    }


})

router.post('/', async(req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save()

    if (!user)
        return res.status(400).send("User Not created")

    return res.status(200).send(user)
})

module.exports = router;