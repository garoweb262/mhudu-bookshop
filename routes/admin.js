const Router = require("express");
const adminController = require("../controllers/admin.controller");
const router = Router();
router.post("/create", adminController.sign_admin);
router.post("/login", adminController.login_admin);
router.get("/dashboard", adminController.get_admin_dashboard);
router.get("/all-purchase", adminController.get_all_purchase);
router.get("/all-rents", adminController.get_all_rent);

router.get("/", adminController.get_admin_login);
router.get("/logout", adminController.get_logout);
module.exports = router;
