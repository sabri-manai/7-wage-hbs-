const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderID: {
        type: String
    },
    totalPrice: {
        type: String
    },
    costumerName: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    delivery: {
        type: String
    },
});


mongoose.model('Order', orderSchema);