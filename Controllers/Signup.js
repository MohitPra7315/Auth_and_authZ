

const Sign = require("../Models/Singup")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()
exports.signupCont = async (req, res) => {
    try {
        const { name, lastName, email, password, role } = req.body;

        const exitemail = await Sign.findOne({ email })
        if (exitemail) {
            return res.send({
                success: false,
                message: "user already exitst"
            })
        }
        let hashPassword;
        try {
            hashPassword = await bcrypt.hash(password, 10)

        } catch (error) {

            res.status(400).json({
                success: false,
                message: "error while the Hashing process"
            })
        }

        const savedSignupdata = await Sign.create({
            name, lastName, email, password: hashPassword, role
        })
        res.status(200).json({
            success: true,
            post: savedSignupdata,
            message: "succesfully data saved Signupdata"
        })



    } catch (error) {
        res.status(200).json({
            success: false,
            post: "error while creating ",
            message: error.message
        })

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check  valid passoerard or email or not 
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "plese fill coreect password and email"
            })
        }

        const userdata = await Sign.findOne({ email });

        if (!userdata) {
            return res.status(401).json({
                success: false,
                message: "user is not registered"
            })
        }

        let paylod = {
            id: userdata._id,
            email: userdata.email,
            role: userdata.role
        }
        if (await bcrypt.compare(password, userdata.password)) {

            let token = jwt.sign(paylod, process.env.JWT_SECRET, {
                expiresIn: "2h"
            }
            )

            userdata.token = token,
                userdata.password = undefined

            let options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userdata,
                message: "succesfully saved"

            })

        } else {
            return res.status(403).json({
                success: false,
                message: "password Incorrect"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            post: "error while login ",
            message: error.message
        })
    }
}