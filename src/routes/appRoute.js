const express = require("express");
//controllers
const utilityController = require("../controllers/utilityController");

const {responseAPI} = require("../utils/general.util");
const homeController = require("../controllers/homeController");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(responseAPI(true, "I am home page"));
});

//home page
router.get('/init-home-page', homeController.homePageInitData);

//Utility
router.get("/division-options", utilityController.divisionList);
router.get("/district-options/:divisionID", utilityController.districtListOverDivision);
router.get("/upazila-options/:districtID", utilityController.upazilaListOverDistrict);

module.exports = router;