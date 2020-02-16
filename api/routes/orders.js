/*
for each new route e.g. this one orders.js
you have to add a line in the app.js file
*/

const express = require('express'); // boilerplate
const router = express.Router(); // boilerplate

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:  'Handling GET requests to /orders'
        });
}); 

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:  'Handling POST requests to /orders',
        order: order
        });
}); 

router.post('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order details',
        id: req.params.orderId
        });
}); 

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'order deleted',
        id: req.params.orderId
        });
}); 

module.exports = router; // boilerplate