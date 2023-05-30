const express = require("express");
const dotenv = require("dotenv").config();
const conn = require("./config/conn");
const cors = require("cors");
const userRoutes = require("./Routes/userRoute.js");
const productRoute = require("./Routes/productRoute");
const bodyParser = require("body-parser");

// express object
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoute);
// database connection for mongo
conn();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
