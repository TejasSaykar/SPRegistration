const productModel = require("../models/productModel");
const screenshotModel = require("../models/screenshotModel");
const { default: mongoose } = require("mongoose");


exports.uploadScreenshot = async (req, res) => {
    const { productId, screenshot } = req.body;
    try {
        // const newScreenshot = await new screenshotModel({ screenshot }).save();

        // let objectId = new mongoose.Types.ObjectId(newScreenshot.id);

        const productScreenshot = await productModel.findByIdAndUpdate({ _id: productId }, { $set: { screenshot: screenshot } }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Screenshot uploaded",
            productScreenshot
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading screenshot",
            error
        })
    }
}


exports.getScreenshot = async (req, res) => {
    // const id = req.params.id;
    try {
        const screenshot = await screenshotModel.find({});
        return res.status(200).json({
            success: true,
            message: "Screenshot getting",
            screenshot
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the screenshot",
            error
        })
    }
}