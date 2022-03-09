const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var validator = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter an email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter an password!"],
    minlength: [6, "Minium password is 6 character!"],
  },
});
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
    else throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const user = mongoose.model("users", userSchema);

module.exports = user;
