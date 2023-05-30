const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // get token
    //const token= req.header("authorization').split(" ").[1];
    const token = req.headers["authorization"].split(" ")[1];
    const decryptedtoken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.userId = decryptedtoken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};
