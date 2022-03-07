const express = require("express");
const connectDB = require("./config/db");
var swaggerUi = require("swagger-ui-express");
swaggerDocument = require('./swagger.json');
var cors = require("cors");
var router = express.Router();

const app = express();

connectDB();

app.use(cors({ origin: true, credentials:true}));

app.use(express.json());

app.use(require("./routes/api/contacts"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.listen(4000);

app.get('/', (req,res) => res.send('Hello World'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port: ${port}`));