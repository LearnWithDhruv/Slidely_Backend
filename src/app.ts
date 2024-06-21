import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
