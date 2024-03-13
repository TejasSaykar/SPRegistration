const userModel = require("../models/employeeModel.js")
const idCardModel = require("../models/idcardModel.js");
const employeeModel = require("../models/employeeModel.js");
const { default: mongoose } = require("mongoose");

exports.registerUser = async (req, res) => {
    try {
        const { fullName, address, aadharNumber, panCardNumber, whatsappNumber, emailId, password } = req.body;

        switch (true) {
            case !fullName: return res.status(401).json({ message: "Fullname is required!" });
            case !address: return res.status(401).json({ message: "Address is required!" });
            case !aadharNumber: return res.status(401).json({ message: "Aadhar number is required!" });
            case !panCardNumber: return res.status(401).json({ message: "Pancard number is required!" });
            case !whatsappNumber: return res.status(401).json({ message: "Whatsapp number is required!" });
            case !emailId: return res.status(401).json({ message: "Emailid is required!" });
            case !password: return res.status(401).json({ message: "Password is required!" });
        }

        const checkmail = await userModel.findOne({ emailId });
        if (checkmail) {
            return res.status(401).json({
                success: false,
                message: "Email already exists please login"
            })
        }

        const newUser = await new userModel({
            fullName, address, aadharNumber, panCardNumber, whatsappNumber, emailId, password
        }).save();

        return res.status(201).json({
            success: true,
            message: "Register successfully",
            newUser
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while registration",
            error
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ emailId: emailId });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        if (password !== user.password) {
            return res.status(401).json({
                success: false,
                message: "Wrong Credentials"
            })
        }
        if (!user.isApprove) {
            return res.status(401).json({
                success: false,
                message: "You are not Approve yet"
            })
        }



        return res.status(200).json({
            success: false,
            message: "Login Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while login",
            error
        })
    }
}


exports.isApprove = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await employeeModel.findByIdAndUpdate({ _id: id }, {
            $set: {
                isApprove: true
            }
        }, { new: true });

        if (user) {
            user.isApprove = true;
        }

        return res.status(200).json({
            message: "Approved"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while Approving",
            error
        });
    }
}

exports.generateIdCard = async (req, res) => {
    try {
        const { userId, fullName, bloodGroup, DOB, contactNumber1, contactNumber2, photo, address } = req.body;
        switch (true) {
            case !fullName: return res.status(401).json({ message: "Fullname is required!" });
            case !bloodGroup: return res.status(401).json({ message: "Blood group is required!" });
            case !DOB: return res.status(401).json({ message: "DOB is required!" });
            case !contactNumber1: return res.status(401).json({ message: "Contact number1 is required!" });
            case !contactNumber2: return res.status(401).json({ message: "Contact number2 is required!" });
            case !photo: return res.status(401).json({ message: "Photo is required!" });
            case !address: return res.status(401).json({ message: "Address is required!" });
        }

        const highestUser = await idCardModel.findOne({}, {}, { sort: { userId: -1 } });
        const nextUserId = highestUser ? highestUser.userId + 1 : 1;
        const userIdCard = await new idCardModel({userId:nextUserId, fullName, bloodGroup, DOB, contactNumber1, contactNumber2, photo, address });
        const saveUser = await userIdCard.save();

        let objectId = new mongoose.Types.ObjectId(saveUser.id)

        const idCard = await employeeModel.findByIdAndUpdate(
            {_id: userId},
            {$push:{idCard: objectId}, $set:{isId:true}},
            {new: true}
        )


        return res.status(200).json({
            success: true,
            message: "Id card is generated",
            idCard
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while generating the id card",
            error
        })
    }
}



exports.getUser = async(req,res) => {
    const id = req.params.id;
    try {
        const employee = await employeeModel.findById({_id:id}).populate({path:"idCard", model:"idcard"});
        return res.status(200).json({
            success: true,
            message: "Employee is getting",
            employee
        }) 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the user",
            error
        })
    }
}