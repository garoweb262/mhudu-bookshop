const Purchase = require("../models/purchase");
const Book = require("../models/book");
const User = require("../models/user");
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
    email: "muhdgazzali01@gmail.com",
    phonenumber: "07066492821",
    name: "garzali ahmad",
  });
  if (!payment.data || payment.data.status != "success")
    return res
      .status(400)
      .json({ success: false, message: "failed to generate payment" });
  console.log(payment.data);
  const purchase = await Purchase.create({
    bookId: result._id,
    price: result.price,
    userId: "6788ihkjd345",
    status: "pending",
    reference: reference,
  });
  purchase.save((err) => {
    if (err) {
      res.json({ message: err.message, type: "danger" });
    } else {
      // req.session.message = {
      //   type: "success",
      //   message: "image uploaded successfully!",
      // };
      res.redirect(`${payment.data.data.link}`);
    }
  });
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
// module.exports.verifyPayment = async (req, res) => {
//   const reference = req.params.reference;
//   Purchase.updateOne(
//     {
//       reference: reference,
//     },
//     { $set: { status: "Success" } }
//   )
//     .then((result) => {
//       res
//         .status(200)
//         .json({
//           success: true,
//           message: "payment verified",
//           status: result.status,
//         });
//     })
//     .catch((error) => {
//       res
//         .status(500)
//         .json({ success: false, message: "error verifying payment" });
//     });
// };
