const mongoose = require('mongoose');

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Invalid ID' });
  }

  next();
};

const validateProductData = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ msg: 'All fields (name, price, category) are required.' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ msg: 'Price must be a positive number.' });
  }

  if (name.length < 3) {
    return res.status(400).json({ msg: 'Name must be at least 3 characters long.' });
  }

  const allowedCategories = ['Electronics', 'Clothing', 'Home', 'Books'];
  if (!allowedCategories.includes(category)) {
    return res.status(400).json({ msg: `Category must be one of: ${allowedCategories.join(', ')}` });
  }

  next();
};

module.exports = {validateId,validateProductData};