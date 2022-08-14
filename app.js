const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helpers/jwt')

const categoriesRoute = require('./routers/categories')
const ordersRoute = require('./routers/orders')
const productsRoute = require('./routers/products')
const userRoute = require('./routers/users');
const res = require('express/lib/response');
const errorHandler = require('./helpers/error-handler')

require('dotenv/config')

app.use(cors());
app.options('*', cors())

const api = process.env.API_URL;

//middlewares
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt())
app.use(errorHandler)

//routers
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/orders`, ordersRoute)
app.use(`${api}/products`, productsRoute)
app.use(`${api}/users`, userRoute)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('connection is ready...')
    }).catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log("server is running at http:localhost:3000")
})