//order model
const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id   : mongoose.Schema.Types.ObjectId,
    product : { type : mongoose.Schema.Types.ObjectId, ref : 'Proudcts' ,required : true  },
    quantity : { type : Number, defulat: 1 }
    
});
 module.exports = mongoose.model('Orders',orderSchema);
 