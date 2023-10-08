const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const {port, db_endpoint} = require("./src/configs/app")

//local
const adminRoute = require("./src/routes/adminRoute");
const appRoute = require("./src/routes/appRoute");
const {responseAPI} = require("./src/utils/general.util");

const app = express();

//config
app.use(cors({
    origin: ["http://localhost:5173", "https://admin.sasthobondhu.com", "https://sasthobondhu.com"]
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', appRoute);
app.use('/api/admin', adminRoute);
app.use((req, res) => {
    res.status(404).json(responseAPI(false, '404! Nothing found'));
})

mongoose
    .connect(db_endpoint)
    .then(response => {
        app.listen(port);
        console.log("port", port)
    })
    .catch(error => {
        console.log("Mongoose connection error: "+ error)
    });
