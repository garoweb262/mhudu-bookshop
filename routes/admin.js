const Router = require("express");
const adminController = require("../controllers/admin.controller");
const router = Router();

router.get("/dashboard", adminController.get_admin_dashboard);
module.exports = router;
