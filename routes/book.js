const Router = require("express");
const bookController = require("../controllers/book.controller");
const upload = require("../middlewares/uploadMiddleware");
const { currentDate } = require("../config/constants");
const Book = require("../models/book");
const router = Router();

router.post("/create", upload.single("dp"), async (req, res) => {
  let dates = currentDate();
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
        message: "user added successfully!",
      };
      res.redirect("/book/all-books");
    }
  });
});
// router.post("/create", upload.single("dp"), bookController.create_book);
router.get("/all-books", bookController.get_all_book);
router.get("/edit/:id", bookController.get_edit_book);
router.get("/view/:id", bookController.get_view_book);
router.put("/:id", bookController.updatebook);
router.delete("/:id", bookController.deletebook);

module.exports = router;
