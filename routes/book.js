const Router = require("express");
const bookController = require("../controllers/book.controller");
const upload = require("../middlewares/uploadMiddleware");
const uploadProfile = require("../middlewares/picMiddleware");
const { currentDate, appUrl, randomCode } = require("../config/constants");
const Book = require("../models/book");
const path = require("path");
const fs = require("fs");
const router = Router();

router.post("/create", upload.single("dp"), async (req, res) => {
  let dates = currentDate();
  let pin = randomCode();
  const { title, description, author, isbn, catalogue, price } = req.body;

  const book = await Book.create({
    title,
    description,
    author,
    isbn,
    catalogue,
    dp: req.file.filename,
    pdf: pin,
    price,
    date: dates,
  });

  book.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      req.session.message = {
        type: "success",
        message: "image uploaded successfully!",
      };
      res.redirect("/book/all-books");
    }
  });
});
router.post(
  "/upload/:id",
  uploadProfile.single("pdf"),
  bookController.upload_pdf
);
router.get("/all-books", bookController.get_all_book);
router.get("/single/:id", bookController.get_pro_book);
router.get("/edit/:id", bookController.get_edit_book);

router.get("/view/:id", bookController.get_view_book);

router.post("/update/:id", upload.single("dp"), bookController.updatebook);

router.get("/delete/:id", bookController.deletebook);

module.exports = router;
