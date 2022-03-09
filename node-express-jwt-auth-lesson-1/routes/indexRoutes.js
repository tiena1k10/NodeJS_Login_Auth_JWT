const blankRoute = require("./blankRoute");
const authMiddle = require("../middleware/auth");
function router(app) {
  app.use("*", authMiddle.ckeckCurrentUser);
  app.use("/", blankRoute);
}
module.exports = {
  router: router,
};
