const Book = require("../models/book");
const {
  currentDate,
  uploadImage,
  randomPin,
  getBase64,
} = require("../config/constants");

// module.exports.create_book = async (req, res) => {
//   let dates = currentDate();
//   let pin = randomPin();
//   const { title, description, author, isbn, catalogue, dp, price } = req.body;
//   try {
//     const book = await Book.create({
//       title,
//       description,
//       author,
//       isbn,
//       catalogue,
//       dp: pin,
//       price,
//       date: dates,
//     });

//     res.status(201).json({ success: true, data: book });
//   } catch (err) {
//     res.status(400).json({ success: false, message: "error creating book" });
//   }
// };

module.exports.get_all_book = (req, res) => {
  Book.find().then(async (result, err) => {
    if (err) {
      console.log(err);
    } else {
      // result.dp = await getBase64("uploads/pictures/" + result.dp);
      res.render("../views/pages/admin/all-books", {
        title: "All Books",
        layout: "./layouts/admin-dash",
        result,
      });
    }
  });
};
module.exports.get_edit_book = async (req, res) => {
  const id = req.params.id;
  Book.findById(id).then((result, err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/pages/admin/edit-book", {
        title: "Edit Books",
        layout: "./layouts/admin-dash",
        result,
      });
    }
  });
};
module.exports.get_view_book = async (req, res) => {
  const id = req.params.id;
  Book.findById(id).then((result, err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/pages/admin/view-book", {
        title: `Book/${result.title}`,
        layout: "./layouts/admin-dash",
        result,
      });
    }
  });
};
module.exports.updatebook = async (req, res) => {
  const id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => {
      res.status(200).json({ success: true, message: "updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "error updating book" });
    });
};
module.exports.deletebook = async (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id)
    .then((result) => {
      res.status(200).json({ success: true, message: "deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "error deleting book" });
    });
};
