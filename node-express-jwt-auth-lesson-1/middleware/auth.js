const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "tiendz", (err, decodeToken) => {
      if (err) res.redirect("/login");
      else {
        next();
      }
    });
  } else res.redirect("/login");
}
const ckeckCurrentUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "tiendz", async (err, decodeToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        var user = await userModel.findById(decodeToken.id);
        res.locals.user = user.email;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
module.exports = {
  requireAuth: requireAuth,
  ckeckCurrentUser: ckeckCurrentUser,
};
