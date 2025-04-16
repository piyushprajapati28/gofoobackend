const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res)=>{

    try {
        // console.log(global.Foods, global.foodCategory);
        res.send([global.Foods,global.foodCategory])
        

    } catch (error) {
        
        console.log(error);
    }
})

module.exports = router;