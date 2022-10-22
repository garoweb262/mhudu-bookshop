const Router = require("express");
const userController = require("../controllers/user.controller");
const router = Router();
router.post("/register", userController.sign_user);
router.post("/login", userController.login_user);
// router.get("/", userController.get_home);
// router.get("/about", userController.get_about);

module.exports = router;
