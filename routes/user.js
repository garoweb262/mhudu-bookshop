const Router = require("express");
const userController = require("../controllers/user.controller");
const router = Router();

router.get("/", userController.get_home);
router.get("/about", userController.get_about);
router.get("/contact", userController.get_contact);
router.get("/login", userController.get_login);
router.get("/register", userController.get_signup);

module.exports = router;
