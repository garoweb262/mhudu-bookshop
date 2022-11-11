const Book = require("../models/book");
const Catalogue = require("../models/catalogue");
const {
  currentDate,
  uploadImage,
  randomPin,
  getBase64,
} = require("../config/constants");
const fs = require("fs");
const path = require("path");

module.exports.get_all_book = (req, res) => {
  Book.find().exec((err, bookResult) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      let id = req.params.id;
      Book.findOne({ bookResult }).exec((err, result) => {
        res.render("../views/pages/admin/all-books", {
          title: "All Books",
          layout: "./layouts/admin-dash",
          result: bookResult,
        });
      });
    }
  });
};
module.exports.get_pro_book = (req, res) => {
  let id = req.params.id;
  Book.findById(id).exec((err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("../views/pages/guest/single", {
        title: ``,
        layout: "./layouts/admin",
        result,
      });
    }
  });
};

module.exports.get_edit_book = async (req, res) => {
  let id = req.params.id;
  Book.findById(id).then((result, err) => {
    if (err) {
      res.redirect("/book/all-book");
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
  let id = req.params.id;
  Book.findById(id).exec((err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      res.render("../views/pages/admin/view-book", {
        title: `${result.title}`,
        layout: "./layouts/admin-dash",
        result,
      });
    }
  });
};
module.exports.upload_pdf = async (req, res) => {
  let dates = currentDate();
  const id = req.params.id;
  Book.findByIdAndUpdate(
    id,
    {
      pdf: req.file.filename,
      date: dates,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "PDF Uploaded successfully!",
        };
        res.redirect(`/book/view/${result._id}`);
      }
    }
  );
};
module.exports.updatebook = async (req, res) => {
  let dates = currentDate();
  let pins = randomPin();
  const id = req.params.id;
  let new_image = "";
  if (req.file) {
    new_image = req.file.filename;
    try {
      fs.unlinkSync("./uploads/" + req.body.old_image);
    } catch (err) {
      console.log(err);
    }
  } else {
    new_image = req.body.old_image;
  }
  Book.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      isbn: req.body.isbn,
      catalogue: req.body.catalogue,
      dp: new_image,
      pdf: pins,
      price: req.body.price,
      date: dates,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "book updated successfully!",
        };
        res.redirect("/book/all-books");
      }
    }
  );
};
module.exports.openPdf = async (req, res) => {
  let id = req.params.id;
  let data = await Book.findOne({ id: id });
  if (data) {
    data.dp = data.dp.split(" ");
    pdf = data.dp.split(" ")[1];
    var file = fs.createReadStream(`./uploads/${pdf}`);
    var stat = fs.statSync(`./uploads/${pdf}`);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(`Content-Disposition", "attachment; filename=${data.title}`);
    file.pipe(res);
    var datas = fs.readFileSync(`/${pdf}`);
    res.contentType("application/pdf");
    res.send(datas);
  } else {
    res.status(404).json({
      message: "book not found",
    });
  }
};
module.exports.deletebook = async (req, res) => {
  const id = req.params.id;
  Book.findByIdAndRemove(id, (err, result) => {
    if (result.dp != "") {
      try {
        fs.unlinkSync("./uploads/" + result.dp.split(""));
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "book deleted successfully!",
      };
      res.redirect("/book/all-books");
    }
  });
};
