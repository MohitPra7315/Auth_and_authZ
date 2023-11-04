const mongoose = require("mongoose");
 
require("dotenv").config();


exports.dbconnection =  async() => {
    mongoose.connect("mongodb+srv://mohitprajapati14101998:jyceMKFgn0sJ70fG@cluster0.0rm9olj.mongodb.net/AuthNApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(console.log("Db connection succesfully"))
        .catch((error) => {
            console.log("Db Facing connection isssuess")
            console.log(error)
            process.exit(1)
        })
}