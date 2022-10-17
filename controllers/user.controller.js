module.exports.get_home = (req, res) => {
  res.render("index", { title: "Home Noorwa bookshop" });
};
module.exports.get_about = (req, res) => {
  res.render("about", { title: "About Noorwa bookshop" });
};
module.exports.get_contact = (req, res) => {
  res.render("contact", { title: "Contact Noorwa bookshop" });
};
module.exports.get_login = (req, res) => {
  res.render("login");
};
module.exports.get_signup = (req, res) => {
  res.render("signup");
};
