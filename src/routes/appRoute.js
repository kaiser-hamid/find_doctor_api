const express = require("express")
const {responseAPI} = require("../utils/general.util");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(responseAPI(true, "I am home page"));
});

module.exports = router;