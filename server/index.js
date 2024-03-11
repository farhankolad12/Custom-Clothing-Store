const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/database");
const connectCloudinary = require("./config/cloudinaryUpload");

connectDatabase();
connectCloudinary();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Import Routers
const user = require("./routes/userRoute");
const category = require("./routes/categoryRoute");
const attribute = require("./routes/attributeRoute");

// Call Routers
app.use("/api", user);
app.use("/api", category);
app.use("/api", attribute);

app.listen(4000);
