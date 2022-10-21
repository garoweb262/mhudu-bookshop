module.exports.get_admin_dashboard = (req, res) => {
  res.render("../views/pages/admin/dashboard", {
    title: "Dashboard Admin",
    layout: "./layouts/admin-dash",
  });
};
