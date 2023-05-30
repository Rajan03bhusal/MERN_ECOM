const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    images: {
      type: Array,
      require: true,
      default: [],
    },
    billavailable: {
      type: Boolean,
      default: false,
      require: true,
    },
    warrantyavailable: {
      type: Boolean,
      default: false,
      require: true,
    },
    accessoriesavailable: {
      type: Boolean,
      default: false,
      require: true,
    },
    boxavailable: {
      type: Boolean,
      default: false,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
