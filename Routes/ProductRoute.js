const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');
const productmiddleware=require('../MiddleWare/Validate')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available products.
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 640fce8b3d524e0567d7d2f9
 *                   name:
 *                     type: string
 *                     example: Laptop
 *                   price:
 *                     type: number
 *                     example: 999.99
 *                   category:
 *                     type: string
 *                     example: Electronics
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error message
 */


router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /products/Addproducts:
 *   post:
 *     summary: Add a new product
 *     description: Create a new product with the provided details.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop
 *               price:
 *                 type: number
 *                 example: 999.99
 *               category:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       201:
 *         description: Product successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 640fce8b3d524e0567d7d2f9
 *                 name:
 *                   type: string
 *                   example: Laptop
 *                 price:
 *                   type: number
 *                   example: 999.99
 *                 category:
 *                   type: string
 *                   example: Electronics
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: All fields are required.
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Error message
 */


router.post('/Addproducts', productmiddleware.validateProductData,productController.addProduct);

module.exports = router;