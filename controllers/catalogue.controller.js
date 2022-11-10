const Catalogue = require("../models/catalogue");
const Book = require("../models/book");
const { currentDate } = require("../config/constants");

module.exports.create_catalogue = async (req, res) => {
  const { name, description } = req.body;
  let dates = currentDate();

  try {
    const catalogue = await Catalogue.create({
      name,
      description,
      date: dates,
    });
    const savedCatalogue = await catalogue.save();
    res.status(201).json({ success: true, data: savedCatalogue });
  } catch (err) {
    res.status(400).json({ errors });
  }
};
module.exports.get_all_catalogue = (req, res) => {
  Catalogue.find().then((result, err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/pages/admin/all-catalogue", {
        title: "All Catalogues",
        layout: "./layouts/admin-dash",
        result,
      });
    }
  });
};

module.exports.get_one_catalogue = async (req, res) => {
  const id = req.params.id;
  Catalogue.findById(id)
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "error fetching catalogues" });
    });
};
module.exports.updatecatalogue = async (req, res) => {
  const id = req.params.id;
  Catalogue.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => {
      res.status(200).json({ success: true, message: "updated successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "error updating catalogues" });
    });
};
module.exports.delete_catalogue = async (req, res) => {
  const id = req.params.id;
  Catalogue.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.json({ message: err.message });
    } else {
      req.session.message = {
        type: "info",
        message: "catalogue deleted successfully!",
      };
      res.redirect("/catalogue/all-catalogue");
    }
  });
};
