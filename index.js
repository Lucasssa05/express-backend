import express from 'express';
import router from './src/routes/routes.js';
import './src/banco/banco.js';

const app = express();

app.use(express.json());

app.use(router);

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:${8080}`);
    })