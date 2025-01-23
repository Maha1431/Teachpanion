const Joi = require('joi');

const employeeSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  position: Joi.string().min(3).max(50).required(),
  department: Joi.string().min(3).max(50).required(),
  salary: Joi.number().positive().required(),
});

const validateEmployee = (req, res, next) => {
    console.log('Request Body:', req.body); // Debugging
    const { error } = employeeSchema.validate(req.body);
  
    if (error) {
      console.error('Validation Error:', error.details); // Debugging
      return res.status(400).json({ msg: error.details[0].message });
    }
  
    next();
  };


module.exports = validateEmployee;