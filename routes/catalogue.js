const Router = require("express");
const catalogueController = require("../controllers/catalogue.controller");
const router = Router();

router.post("/create", catalogueController.create_catalogue);
router.get("/all-catalogue", catalogueController.get_all_catalogue);
router.get("/:id", catalogueController.get_one_catalogue);
router.put("/:id", catalogueController.updatecatalogue);
router.delete("/:id", catalogueController.deletecatalogue);

module.exports = router;
