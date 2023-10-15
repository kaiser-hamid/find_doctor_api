const express = require("express");
//controllers
const utilityController = require("../controllers/utilityController");

const {responseAPI} = require("../utils/general.util");
const homeController = require("../controllers/homeController");
const doctorController = require("../controllers/DoctorController");
const router = express.Router();

router.get("/", (req, res) => {
    res.json(responseAPI(true, "I am home page"));
});

//home page
router.get('/init-home-page', homeController.homePageInitData);

//doctors
router.get('/doctors/form-helper-data', doctorController.searchFormHelperData);
router.get('/doctors', doctorController.list);
router.get('/doctors/:id', doctorController.details);

//chambers
router.get('/chambers', utilityController.chamberList);

//Utility
router.get("/division-options", utilityController.divisionList);
router.get("/district-options/:divisionID", utilityController.districtListOverDivision);
router.get("/upazila-options/:districtID", utilityController.upazilaListOverDistrict);

module.exports = router;