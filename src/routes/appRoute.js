const express = require("express");
//controllers
const utilityController = require("../controllers/utilityController");

const {responseAPI} = require("../utils/general.util");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(responseAPI(true, "I am home page"));
});

//Utility
router.get("/division-options", utilityController.divisionList);
router.get("/district-options/:divisionID", utilityController.districtListOverDivision);
router.get("/upazila-options/:districtID", utilityController.upazilaListOverDistrict);

module.exports = router;