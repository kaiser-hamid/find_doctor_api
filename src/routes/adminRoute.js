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
router.get("/chambers", authAdminMiddleware, chamberController.chambers);
router.post("/chambers", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.saveChamber, chamberController.saveChamber);
router.get("/chambers/:id/edit", authAdminMiddleware, chamberController.editFormHelperData);

router.put("/chambers/:id/update", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.updateChamber, chamberController.updateChamber);
/*
router.put("/chambers/:id/update", authAdminMiddleware, multipartData(["image", "logo"]), chamberValidator.updateChamber, (req, res) => {
    res.json("Passed")
});
*/

router.delete("/chambers/:id", authAdminMiddleware, chamberController.removeChamber);
router.get("/chamber/form-helper-data", authAdminMiddleware, chamberController.addFormHelperData);


//router.post("/temp-reg", authController.tempUserInsertPost);

module.exports = router;