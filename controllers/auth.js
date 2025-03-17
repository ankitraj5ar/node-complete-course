const getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Add Product",
    path: "/login",
    isAuthenticated: req.isLoggedIn,
  });
};

const postLogin = (req, res, next) => {
  req.isLoggedIn = true;
  req.session.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "isLoggedIn=true");
  res.redirect("/");
};

export default {
  getLogin,
  postLogin,
};
