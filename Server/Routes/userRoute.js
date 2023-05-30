const router = require("express").Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// user registration
router.post("/register", async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(200)
        .send({ message: "Email Already Exit", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Successfully", success: true });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// user login

router.post("/login", async (req, res) => {
  try {
    // check if user exists or not
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }
    // if user is active or not
    if (user.status !== "active") {
      throw new Error("User is blocked,Please contact admin");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    // compare password for existing user
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    res.send({
      success: true,
      message: "Login Successful",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get call user
router.get("/get-user", authMiddleware, async (req, res) => {
  try {
    const user = await userModel.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
// get call user
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    await userModel.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
