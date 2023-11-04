
const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000

console.log(PORT)
app.use(express.json());


const router = require("./Routes/AllRoutes")
app.use("/api/v1", router)


require("./Confiq/database").dbconnection();



app.listen(PORT, () => {

    console.log(`App is sucessfly run on ${PORT}`)

})
console.log("working upto here")

app.get("/", (req, res) => {
    res.send(`<h1>This our home page</h1>`)

})

