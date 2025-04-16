const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    
        email: {
          type: String,
          required: false, 
          trim: true,     
          lowercase: true 
        },
        order_data: {
          type: Array,
          required: true
        },

      }, { timestamps: true });


module.exports = mongoose.model('orders', OrderSchema)