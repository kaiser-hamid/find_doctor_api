const express = require("express");
const authController = require("../controllers/admin/authController");
const authValidator = require("../validation/authValidator");

const {responseAPI} = require("../utils/general.util");
const authAdminMiddleware = require("../middlewares/authAdminMiddleware");

const router = express.Router();

router.get("/auth-check", authAdminMiddleware, authController.loginCheckGet);
router.post("/login", authValidator.login(), authController.loginPost);
router.post("/password-change", authValidator.changePass(), authController.changePassword);


//router.post("/temp-reg", authController.tempUserInsertPost);

module.exports = router;