const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    productID: {
        type: String
    },
    item: {
        type: String
    },
    color: {
        type: String
    },
    quantity: {
        type: String
    },
    size: {
        type: String
    },
    gender: {
        type: String
    },
    price: {
        type: String
    },
});


mongoose.model('Product', productSchema);