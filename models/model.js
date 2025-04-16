const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    CategoryName: { type: String, required: true, trim: true },  
    name: { type: String, required: true },
    img: { type: String, required: true },
    options: { type: Array, required: true },
    description: { type: String, required: true },
});



const modelItems = mongoose.model('food', modelSchema);


module.exports = modelItems ;  
