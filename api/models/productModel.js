const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    purchaserName:{
        type: String,
        required: true
    },
    purchaserAddress:{
        type: String,
        required: true
    },
    purchaserMobile:{
        type: Number,
        required: true
    },
    purchaserWhatsapp:{
        type: Number,
        required: true
    },
    purchaserEmail:{
        type: String,
        required: true
    },
    screenshot:{
        type: String,
        // required: true
    }
},{timestamps: true});

module.exports = mongoose.model("product", productSchema)