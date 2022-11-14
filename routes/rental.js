const Router = require("express");
const rentalController = require("../controllers/rental.controller");
const router = Router();

router.post("/rent-book", rentalController.create_rental);
router.get("/all-rentedbook", rentalController.get_all_rental);
router.get("/:id", rentalController.get_one_rental);
router.put("/:id", rentalController.updaterental);
router.get("/delete/:id", rentalController.delete_rental);

module.exports = router;
