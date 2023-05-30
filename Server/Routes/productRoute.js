const router = require("express").Router();
const productModel = require("../model/productModel");
const authMiddleware = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");

// add new product
router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newproduct = await productModel(req.body);
    await newproduct.save();
    console.log(newproduct);
    res.send({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all products
router.post("/get-products", async (req, res) => {
  try {
    const { seller, category = [], age = [] } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }

    const products = await productModel
      .find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });

    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get  product by id
router.get("/get-product-by-id/:id", async (req, res) => {
  try {
    const products = await productModel
      .findById(req.params.id)
      .populate("seller");

    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit  product
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
    const products = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({
      success: true,
      message: "Product updated Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// delete  product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    const products = await productModel.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// handle image and upload

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
router.post(
  "/upload-image-to-product",
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Demo",
      });

      const productId = req.body.productId;
      await productModel.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        data: result.secure_url,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// update product status
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await productModel.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
