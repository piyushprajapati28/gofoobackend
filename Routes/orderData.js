const express = require('express');
const router = express.Router();
const order = require('../models/orders');

router.post('/ordersData', async (req, res) => {
    let data = req.body.order_data;

   
    data.unshift({ order_date: req.body.order_date });  

    console.log("Order email:", req.body.email);
    
   
    let eId = await order.findOne({ 'email': req.body.email });

    if (eId === null) {
        try {
            
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

router.get('/myorderData', async (req, res) => {
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
