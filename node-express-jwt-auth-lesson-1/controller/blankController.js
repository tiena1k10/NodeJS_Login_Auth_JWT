const userModel = require("../models/users");
var jwt = require("jsonwebtoken");
function handelError(err) {
  console.log(err.message, err.code);
  var error = { email: "", password: "" };
  if (err.message === "incorrect password") {
    error.password = "incorrect password";
    return error;
  }
  if (err.message === "incorrect email") {
    error.email = "incorrect email";
    return error;
  }
  if (err.code === 11000) {
    error["email"] = "that email is already registed";
    return error;
  }
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach((errors) => {
      error[`${errors.properties.path}`] = errors.properties.message;
    });
  }
  return error;
}
const maxAge = 3 * 24 * 60; // 3 days
function createToken(id) {
  return jwt.sign({ id }, "tiendz", {
    expiresIn: maxAge,
  });
}
class blankController {
  home(req, res) {
    res.render("home");
  }
  smoothies(req, res) {
    res.render("smoothies");
  }
  getSignup(req, res) {
    res.render("signup");
  }
  getLogin(req, res) {
    res.render("login");
  }
  getLogout(req, res) {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
  }
  postSignup(req, res) {
    const { email, password } = req.body;
    userModel.create({ email, password }, (error, user) => {
      if (!error) res.json({ user: user._id });
      else {
        var errors = handelError(error);
        res.status(400).json({ errors });
      }
    });
  }
  async postLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } catch (err) {
      var errors = handelError(err);
      res.status(400).json({ errors: errors });
    }
  }
}
module.exports = new blankController();
