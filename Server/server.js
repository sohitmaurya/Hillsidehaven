const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')

const bookingDetails = require('./routes/bookingDetails')
const customerDetails = require('./routes/customerDetails')


const PORT = process.env.PORT || 3007;

const DBSTRING = "mongodb+srv://root:root@hillsidehaven.u5hfywv.mongodb.net/hillsidehaven";

mongoose.connect(DBSTRING, () => {
    console.log("mongoDB connected")
}, e =>
    console.log("error occurred while connecting to DB:", e));


let app = express();

app.use(cors());
app.use(bodyparser.json())

app.use('/bookingDetails', bookingDetails)
app.use('/customerDetails', customerDetails)


app.listen(PORT, () => {
    console.log(`the server is running on port : ${PORT}`)
})