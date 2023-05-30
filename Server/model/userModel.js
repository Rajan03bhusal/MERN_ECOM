const mongoose = require("mongoose");
// schema for user
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      default: "User",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);
//
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
