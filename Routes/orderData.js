const express = require('express');
const router = express.Router();
const order = require('../models/orders');

router.post('/ordersData', async (req, res) => {
    let data = req.body.order_data;
    
    // Instead of splice, add order_date properly
    data.unshift({ order_date: req.body.order_date });  // Add the order_date at the beginning of the array

    console.log("Order email:", req.body.email);
    
    // Check if the user already has an order
    let eId = await order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            // If no order found for the email, create a new order
            console.log("Creating new order", data);
            await order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Server Error: " + error.message });
        }
    } else {
        try {
            await order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "Server Error: " + error.message });
        }
    }
});

router.post('/myorderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await order.findOne({ 'email': req.body.email })
        console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
