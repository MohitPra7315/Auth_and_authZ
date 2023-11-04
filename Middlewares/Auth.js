

require("dotenv").config();

const jwt = require("jsonwebtoken")

exports.Auth = async (req, res, next) => {
    try {
        // first work get the fetch the token for check validation
        const token = req.body.token;
        console.log(token);

        // second work we will check token is avilable or not
        if (!token) {
             res.status(401).json({
                success: false,
                Message: " token not present"
            })
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.user = payload;
        
console.log(payload)
        } catch (error) {
          return  res.status(401).json({
                success: false,
                Message: "token is in valid"

            })
        }
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            post: "something went wrong while veifaying token worng",
            
            message:error.message
        })
    }
}




exports.isStudent = async (req, res, next) => {
    try {
      

        if (req.user.role!=="Student") {
            res.status(500).json({
                success: false,
                Message: "this is protyected routes for student  "
            })
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            Message: "error while Authization"
        })
    }
}


exports.isAdmin = async (req, res, next) => {
    try {
      

        if (req.user.role!=="Admin") {
            res.status(500).json({
                success: false,
                Message: "this is protyected routes for Admin  "
            })
        }
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            Message: "error while Authization"
        })
    }
}