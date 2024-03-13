const express = require("express")
const { generateIdCard, isApprove, registerUser, loginUser, getUser } = require("../controllers/employeeController.js");
const { Email } = require("../utils/sendMail.js");

const router = express.Router();

router.post("/register", registerUser);

router.get("/isapprove/:id", isApprove);

router.post("/email", Email);

router.post("/generateId", generateIdCard);

router.get("/getuser/:id", getUser);

router.post("/login", loginUser);

module.exports =  router;