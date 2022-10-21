const Router = require("express");
const userController = require("../controllers/user.controller");
const router = Router();

router.get("/", userController.get_home);
router.get("/about", userController.get_about);
router.get("/contact", userController.get_contact);
router.get("/login", userController.get_login);
router.get("/register", userController.get_signup);
router.get("/forget-pass", userController.get_pass);
router.get("/forget-password", userController.get_change);
router.get("/dashboard", userController.get_dasboard);
router.get("/profile", userController.get_profile);
router.get("/update-profile", userController.get_update_profile);
router.get("/my-books", userController.get_my_books);

module.exports = router;
