
const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Student", "Admin", "Visitor"]
    }
    ,token:{
        type:String
    }
})

module.exports = mongoose.model("Sign", SignupSchema)