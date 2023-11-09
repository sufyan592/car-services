const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Enter a Valid Email"],
  },
  password: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordToken: String,
  passwordResetTokenExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  // if(this.isModified(this.password) return next())
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
userSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.compairePass = async function (password, dpassword) {
  return await bcrypt.compare(password, dpassword);
};

userSchema.methods.changedPasswordAfter = function (JWtTimeStemp) {
  if (this.passwordChangedAt) {
    const passwordConvert = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWtTimeStemp < passwordConvert;
  }
  // False means password not changed
  return false;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
