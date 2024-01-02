const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: employees,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, location } = req.body;

  try {
    const employee = await Employee.create({
      name,
      location,
    });

    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: employee,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: employee,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, location },
      { new: true }
    );

    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: employee,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.status(200).json({
      Success: true,
      Messsage: "Success",
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};

exports.filterEmployee = async (req, res) => {
  try {
    const { location, order } = req.body;

    let query = {};

    if (location) {
      query.location = { $regex: new RegExp(`^${location}`, "i") };
    }

    const employees = await Employee.find(query).sort({
      name: order === "Ascending" ? 1 : -1,
    });

    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Success: false,
      Messsage: "Something Went Wrong",
      error: err.message,
    });
  }
};
