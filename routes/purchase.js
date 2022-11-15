const Router = require("express");
const purchaseController = require("../controllers/purchase.controller");
const { checkAuth } = require("../middlewares/check-user");
const { requireAuth, checkUser } = require("../middlewares/verify");
const router = Router();
router.get("*", checkUser);
router.post(
  "/purchase-book/:id",
  checkAuth,
  requireAuth,
  purchaseController.create_purchase
);
// router.get("/all-purchase", purchaseController.get_all_purchase);
// router.get("/:id", purchaseController.get_one_purchase);

module.exports = router;
