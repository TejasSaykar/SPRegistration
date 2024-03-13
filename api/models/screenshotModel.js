const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema({
    screenshot:{
        type: String,
        required: true
    }
},{timestamps: true});


module.exports = mongoose.model("screenshot", screenshotSchema);