const express = require('express');
const router = express.Router();
const employeeController = require('../Controllers/employeeController');
const empmiddleware= require("../MiddleWare/EmployeeValidator");
const validadate = require("../MiddleWare/Validate");
const validateEmployee = require("../MiddleWare/EmployeeValidator")

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management APIs
 */

/**
 * @swagger
 * /employees/:
 *   post:
 *     summary: Add a new employee
 *     description: Create a new employee with the provided details.
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               position:
 *                 type: string
 *                 example: Software Engineer
 *               department:
 *                 type: string
 *                 example: IT
 *               salary:
 *                 type: number
 *                 example: 75000
 *     responses:
 *       201:
 *         description: Employee successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Employee added
 *                 employee:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 640fce8b3d524e0567d7d2f9
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     position:
 *                       type: string
 *                       example: Software Engineer
 *                     department:
 *                       type: string
 *                       example: IT
 *                     salary:
 *                       type: number
 *                       example: 75000
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: name is required
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

router.post("/", empmiddleware, employeeController.addEmp);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     description: Deletes an employee from the database based on the provided ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Emp deleted
 *                 employee:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Emp not found
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
router.delete('/:id', validadate.validateId,employeeController.deleteEmp);

/**
 * @swagger
 * /employees/name/{name}:
 *   get:
 *     summary: Get an employee by name
 *     description: Retrieve the details of an employee by their name.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: The name of the employee to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Emp not found
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message
 */

router.get('/name/:name', employeeController.getEmpByName);

/**
 * @swagger
 * /employees/highest-salary:
 *   get:
 *     summary: Get the employee with the highest salary
 *     description: Retrieve the details of the employee who has the highest salary in the database.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Employee with the highest salary retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: No employee found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: No emp found
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

router.get('/highest-salary', employeeController.getEmpWithHighestSalary);

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees from the database.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of employees.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
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

router.get('/', employeeController.getAllEmp);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Update an employee's details by ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         required: true
 *         description: The employee data to update.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: John Doe
 *             position:
 *               type: string
 *               example: Manager
 *             department:
 *               type: string
 *               example: Sales
 *             salary:
 *               type: number
 *               example: 50000
 *     responses:
 *       200:
 *         description: Successfully updated the employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Emp updated
 *                 updatedEmployee:
 *                   $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Emp not found
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

router.put('/:id', validadate.validateId, validateEmployee, employeeController.updateEmp);
module.exports = router;