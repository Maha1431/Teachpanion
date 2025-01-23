const Employee = require('../Models/employeeModel');

const addEmp = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({ msg: 'Employee added', employee });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteEmp = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) return res.status(404).json({ msg: 'Emp not found' });
    res.status(200).json({ message: 'Emp deleted', employee });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getEmpByName = async (req, res) => {
  try {
    const { name } = req.params;
    const employee = await Employee.findOne({ name });
    if (!employee) return res.status(404).json({ message: 'Emp not found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmpWithHighestSalary = async (req, res) => {
  try {
    const employee = await Employee.findOne().sort({ salary: -1 });
    if (!employee) return res.status(404).json({ msg: 'No emp found' });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getAllEmp = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateEmp = async (req, res) => {
  console.log('Request Body:', req.body); // Debugging
  try {
    const { id } = req.params;
    console.log('ID:', id); // Debugging

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ msg: 'Emp not found' });
    }

    res.status(200).json({ msg: 'Emp updated', updatedEmployee });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports={addEmp,deleteEmp,getEmpByName,getEmpWithHighestSalary,getAllEmp,updateEmp}