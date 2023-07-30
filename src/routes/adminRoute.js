const express = require("express");
const authController = require("../controllers/admin/authController");
const chamberController = require("../controllers/admin/chamberController")

const authValidator = require("../validation/authValidator");
const chamberValidator = require("../validation/chamberValidator");

const {responseAPI} = require("../utils/general.util");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const {multipartData} = require("../utils/fileHandler.util");

const router = express.Router();

router.get("/auth-check", authAdminMiddleware, authController.loginCheckGet);
router.post("/login", authValidator.loginPost, authController.loginPost);
router.post("/password-change", authAdminMiddleware, authValidator.changePassword, authController.changePassword);

//Chamber
router.get("/chamber/form-helper-data", authAdminMiddleware, chamberController.addFormHelperData);
router.post("/chambers", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.saveChamber, chamberController.saveChamber);


//router.post("/temp-reg", authController.tempUserInsertPost);

module.exports = router;