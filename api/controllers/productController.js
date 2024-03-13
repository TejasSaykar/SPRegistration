const productModel = require("../models/productModel");

exports.purchaseProduct = async (req, res) => {
    try {
        const { productName, purchaserName, purchaserMobile, purchaserWhatsapp, purchaserAddress, purchaserEmail } = req.body;

        if (!productName && !purchaserName && !purchaserMobile && !purchaserWhatsapp && !purchaserAddress && purchaserEmail) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const product = await new productModel({
            productName, purchaserName, purchaserMobile, purchaserWhatsapp, purchaserAddress, purchaserEmail
        }).save();

        return res.status(200).json({
            success: true,
            message: "Product Purchased",
            product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while purchase the product",
            error
        })
    }
}

exports.getProducts = async (req,res) => {
    try {
        const products = await productModel.find({});
        return res.status(200).json({
            success: true,
            productsCount: products.length,
            message: "All products are getting",
            products
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the all products",
            error
        })
    }
}