import express from "express";
import swaggerUI from "swagger-ui-express";
import cors from 'cors';
import * as swaggerDocument from './swagger.json';

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.listen(3000, () => console.log("Server is running on port 3000")) 

