const express = require("express");
const authController = require("../controllers/admin/authController");
const chamberController = require("../controllers/admin/chamberController")

const authValidator = require("../validation/authValidator");
const chamberValidator = require("../validation/chamberValidator");

const {responseAPI} = require("../utils/general.util");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");
const validateFormDataMiddleware = require('../middlewares/validateFormDataMiddleware')
const {multipartData} = require("../utils/fileHandler.util");

const router = express.Router();

//Admin
router.get("/auth-check", authAdminMiddleware, authController.loginCheckGet);
router.post("/login", authValidator.loginPost, validateFormDataMiddleware, authController.loginPost);
router.post("/password-change", authAdminMiddleware, authValidator.changePassword, validateFormDataMiddleware, authController.changePassword);

//Chamber
router.get("/chambers", authAdminMiddleware, chamberController.chambers);
router.post("/chambers", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.saveChamber, validateFormDataMiddleware, chamberController.saveChamber);
router.get("/chambers/:id/edit", authAdminMiddleware, chamberController.editFormHelperData);
router.put("/chambers/:id/update", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.updateChamber, validateFormDataMiddleware, chamberController.updateChamber);
router.delete("/chambers/:id", authAdminMiddleware, chamberController.removeChamber);
router.get("/chamber/form-helper-data", authAdminMiddleware, chamberController.addFormHelperData);




// router.post("/temp-reg", authController.tempUserInsertPost);
module.exports = router;