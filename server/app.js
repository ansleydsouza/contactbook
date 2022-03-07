const express = require("express");
const connectDB = require("./config/db");
var swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require('swagger-jsdoc');
var cors = require("cors");

const app = express();

const port = process.env.PORT || 8082;

connectDB();

app.use(cors({ origin: true, credentials:true}));

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Contacts REST API',
            description: "A REST API built with Express and MongoDB. This API provides the ability to CRUD phone numbers and names"
        },
    },
    swagger: '2.0',    basePath: '/v1',    schemes: [
        'http'
    ],
    consumes: [
        'application/json'
    ],    produces: [
        'application/json'
    ],
    apis: ['./routes/api/*.js']
}

app.use(require("./routes/api/contacts"));

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => console.log(`Server running on port: ${port}`));