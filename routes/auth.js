const Router = require("express");
const userController = require("../controllers/user.controller");
const router = Router();
router.post("/register", userController.sign_user);
router.post("/login", userController.login_user);
router.get("/", userController.get_all_User);
router.get("/:id", userController.get_one_User);
// router.put("/:id", userController.updateUser);
router.put("/send-mail", userController.updatePin);
// router.put("/forget-pass", userController.updatePass);

module.exports = router;
