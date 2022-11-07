const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter a valid email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },

  phone: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  PassSecret: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [8, "minimun password length is 8 character"],
  },
  date: {
    type: String,
    required: true,
  },
});

//fire a function before doc save to db
userSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//static method to login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcryptjs.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const User = mongoose.model("user", userSchema);

module.exports = User;
