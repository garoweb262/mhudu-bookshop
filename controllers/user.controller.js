module.exports.get_home = (req, res) => {
  res.render("../views/pages/guest/index", { title: "Home Noorwa bookshop" });
};
module.exports.get_about = (req, res) => {
  res.render("../views/pages/guest/about", { title: "About Noorwa bookshop" });
};
module.exports.get_contact = (req, res) => {
  res.render("../views/pages/guest/contact", {
    title: "Contact Noorwa bookshop",
  });
};
module.exports.get_login = (req, res) => {
  res.render("../views/pages/guest/login", { title: "login Noorwa bookshop" });
};
module.exports.get_signup = (req, res) => {
  res.render("../views/pages/guest/signup", {
    title: "Signup Noorwa bookshop",
  });
};
module.exports.get_pass = (req, res) => {
  res.render("../views/pages/guest/forget-pass", {
    title: "Forget-Passsword Noorwa bookshop",
  });
};
module.exports.get_change = (req, res) => {
  res.render("../views/pages/guest/change-pass", {
    title: "Forget-Passsword Noorwa bookshop",
  });
};
module.exports.get_dasboard = (req, res) => {
  res.render("../views/pages/users/dashboard", {
    title: "Dashboard Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_profile = (req, res) => {
  res.render("../views/pages/users/profile", {
    title: "Profile Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_my_books = (req, res) => {
  res.render("../views/pages/users/my-books", {
    title: "My Books Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_update_profile = (req, res) => {
  res.render("../views/pages/users/update-profile", {
    title: "Update Profile Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
