
const express = require("express");
const router = express.Router();

const { signupCont } = require("../Controllers/Signup")
const { login } = require("../Controllers/Signup")
const {Auth,isStudent,isAdmin}=require("../Middlewares/Auth")
router.post("/Signup/create", signupCont)
router.post("/login", login)

console.log("working")  

router.get("/test",Auth,(req,res)=>{
    res.status(500).json({
        success:true,
        message:"done worl will done "
    })
})

router.get("/Student",Auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"user is redirect to Student page "
    })
})


router.get("/Admin",Auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"user is redirect to Admin page "
    })
})
module.exports = router;

 
// "email":"Lakshmi@gmail.com",
// "password":"Bujjakka"   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDYzMGVhYWI1NTQyZGMxNzZiZmIxMiIsImVtYWlsIjoiTGFrc2htaUBnbWFpbC5jb20iLCJyb2xlIjoiU3R1ZGVudCIsImlhdCI6MTY5OTA5ODkwNCwiZXhwIjoxNjk5MTA2MTA0fQ.WlsgUsp_HKWgIMFs0SQm2JEHZMOsJESJ19SELej28gQ"