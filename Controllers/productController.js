const Product = require('../Models/Product Model');

getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


 addProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    // Validation (optional)
    if (!name || !price  || !category) {
      return res.status(400).json({ msg: 'All fields are required.' });
    }

    const newProduct = new Product({
      name,
      price,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports={getAllProducts,addProduct}