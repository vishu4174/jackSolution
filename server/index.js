const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/jackSolution", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Load models
require("./models/User");
require("./models/Department");
require("./models/Employee");

// Load routes
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);
app.use("/employees", employeeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
