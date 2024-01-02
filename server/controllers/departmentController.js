const mongoose = require("mongoose");
const Department = mongoose.model("Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      Success: true,
      Message: "Departments retrieved successfully",
      Data: departments,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    const department = await Department.create({
      name,
      description,
    });

    res.status(200).json({
      Success: true,
      Message: "Department created successfully",
      Data: department,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findById(id);
    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: department,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      Message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const department = await Department.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    res.status(200).json({
      Success: true,
      Messsage: "Success",
      Data: department,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({
      Success: true,
      Messsage: "Success",
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
