const Router = require("express");
const userController = require("../controllers/user.controller");
const { requireAuth, checkUser } = require("../middlewares/verify");
const router = Router();
router.get("*", checkUser);
router.get("/", userController.get_home);
router.get("/about", userController.get_about);
router.get("/contact", userController.get_contact);
router.get("/login", userController.get_login);
router.get("/register", userController.get_signup);
router.get("/forget-pass", userController.get_pass);
router.get("/forget-password", userController.get_change);
router.get("/dashboard", requireAuth, userController.get_dasboard);
router.get("/profile", requireAuth, userController.get_profile);
router.get("/update-profile", requireAuth, userController.get_update_profile);
router.get("/my-books", requireAuth, userController.get_my_books);
router.get("/logout", userController.get_logout);

module.exports = router;
