const Router = require("express");
const bookController = require("../controllers/book.controller");
const upload = require("../middlewares/uploadMiddleware");
const { currentDate, appUrl, randomCode } = require("../config/constants");
const Book = require("../models/book");
const path = require("path");
const fs = require("fs");
const router = Router();

router.post("/create", upload.single("dp"), async (req, res) => {
  let dates = currentDate();
  // let pin = randomCode();
  // const reqFiles = [];
  // // const url = req.protocol + "://" + req.get("host");
  // for (var i = 0; i < req.files.length; i++) {
  //   reqFiles.push(req.files[i].filename);
  // }

  // const strImages = reqFiles.join(" ");
  const { title, description, author, isbn, catalogue, price } = req.body;

  const book = await Book.create({
    title,
    description,
    author,
    isbn,
    catalogue,
    dp: req.file.filename,
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

router.get("/all-books", bookController.get_all_book);
// router.get("/all-books", bookController.get_product);
router.get("/edit/:id", bookController.get_edit_book);
router.get("/view/:id", bookController.get_view_book);
// router.get("/open-pdf", );
router.post("/update/:id", upload.single("dp"), bookController.updatebook);
router.get("/delete/:id", bookController.deletebook);

module.exports = router;
