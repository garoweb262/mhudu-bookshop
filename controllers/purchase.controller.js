const Purchase = require("../models/purchase");
const Book = require("../models/book");

const {
  currentDate,
  randomCode,
  generatePayment,
} = require("../config/constants");

module.exports.create_purchase = async (req, res) => {
  const reference = randomCode();
  const id = req.params.id;
  const result = await Book.findById(id).exec();
  if (!result)
    return res
      .status(400)
      .json({ success: false, message: "couldn't find book" });

  const payment = await generatePayment({
    tx_ref: reference,
    amount: result.price,
    email: req.userData.email,
    phonenumber: req.userData.phone,
    name: req.userData.name,
  });
  if (!payment.data || payment.data.status != "success")
    return res
      .status(400)
      .json({ success: false, message: "failed to generate payment" });
  console.log(payment.data);
  const purchase = await Purchase.create({
    bookId: result._id,
    price: result.price,
    userId: req.userData._id,
    status: "pending",
    reference: reference,
  });
  const savedCatalogue = await purchase.save();
  res.status(201).json({
    success: true,
    data: savedCatalogue,
    link: payment.data.data.link,
  });
  // res.redirect(`${payment.data.data.link}`);
  // purchase.save((err) => {
  //   if (err) {
  //     res.json({ message: err.message, type: "danger" });
  //   } else {
  //     const token = localStorage.getItem("userToken");
  //     // console.log(localStorage.getItem("userToken"));

  //     res.headers("Authorization", token);
  //     res.redirect(`${payment.data.data.link}`);
  //   }
  // });
};
// module.exports.get_allPayments = (req, res) => {
//   Purchase.find().then((data, err) => {
//     if (err) {
//       console.log(err);
//     } else {

//       res.render("../views/pages/admin/verify", {

//         data,
//       });
//     }
//   });
// };
