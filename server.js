const express =require('express')
const dotenv=require('dotenv') 
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const mongoose =require("mongoose")
dotenv.config()
const cors=require("cors")
const { MongoClient, ServerApiVersion } = require('mongodb');
const empRoutes = require('./Routes/employeeRoute');
const prdRoutes = require('./Routes/ProductRoute');
const app=express();
app.use(express.json())
app.use(cors())

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for Employee and Product management",
    },
    servers: [
      {
        url: "http://localhost:5000", 
      },
    ],
  },
  apis: ["./Routes/employeeRoute.js", "./Routes/productRoute.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));




//Emp Route
app.use('/employees', empRoutes);
//Prdouct Routes
app.use('/products', prdRoutes);

mongoose.connect(process.env.MONGODBURI).
then(()=>{  
  console.log("Mongo connected")
  app.listen(process.env.PORT,()=>{
      console.log("Server is Running...",process.env.PORT)
  })}).
catch((e)=>{console.log("not Connected",e)})