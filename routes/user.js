const Router = require("express");
const userController = require("../controllers/user.controller");
const { requireAuth, checkUser } = require("../middlewares/verify");

const router = Router();

router.get("*", checkUser);
router.get("/", userController.get_product);
router.get("/about", userController.get_about);
router.get("/search-book?term", userController.search_book);
router.get("/cart", requireAuth, userController.get_cart);
router.get("/purchase/:id", requireAuth, userController.get_purchase);
router.get("/verify", requireAuth, userController.get_verify);
router.get("/rent-verify", requireAuth, userController.get_rent_verify);
router.get("/rental/:id", requireAuth, userController.get_rental);
router.get("/open-pdf/:id", userController.openPdf);
router.get("/contact", userController.get_contact);
router.get("/login", userController.get_login);
router.get("/register", userController.get_signup);
router.get("/forget-pass", userController.get_pass);
router.get("/forget-password", userController.get_change);
router.get("/dashboard", requireAuth, requireAuth, userController.get_dasboard);
router.get("/profile", requireAuth, requireAuth, userController.get_profile);
router.get(
  "/update-profile",
  requireAuth,
  requireAuth,
  userController.get_update_profile
);
router.get("/my-books", requireAuth, requireAuth, userController.get_my_books);
router.get("/logout", userController.get_logout);
router.get("/faq", userController.get_faq);
router.get("/add-catalogue", userController.get_catalogue_add);
router.get("/add-book", userController.get_catalogue_form);
router.get("/upload/:id", userController.get_upload_pdf);
router.get("/all-purchase", userController.get_allPurchase);
router.get("/all-rents", userController.get_allRental);
router.get("/all-users", userController.get_allUsers);
router.get("/title/:id", userController.get_product_cat);
router.get("/delete/:id", userController.delete_user);
router.get("/my-book/view/:id", userController.get_my_view_book);
router.get("/my-rent/view/:id", userController.get_my_view_rent);
router.get("/rent-open-pdf/:id", checkUser, userController.rent_openPdf);

module.exports = router;
