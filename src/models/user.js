const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: Array, default: ['student'] },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = function (email) {
  return this.findOne({email});
}

module.exports = mongoose.model("User", userSchema);
