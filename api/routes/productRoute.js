const express = require("express");
const { purchaseProduct, getProducts } = require("../controllers/productController");
const { userEmail } = require("../utils/userMail");
const { adminEmail } = require("../utils/adminMail");
const { uploadScreenshot, getScreenshot } = require("../controllers/screenshotController");


const router = express.Router();

router.post("/purchase", purchaseProduct);

router.post("/userEmail", userEmail);

router.post("/adminEmail", adminEmail);

router.get("/get-products", getProducts);

router.post("/upload-screenshot", uploadScreenshot)

router.get("/get-screenshot", getScreenshot);

module.exports = router;