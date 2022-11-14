const Router = require("express");
const purchaseController = require("../controllers/purchase.controller");
const router = Router();

router.post("/purchase-book/:id", purchaseController.create_purchase);
// router.get("/all-purchase", purchaseController.get_all_purchase);
// router.get("/:id", purchaseController.get_one_purchase);

module.exports = router;
