import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes'

dotenv.config()

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

const port = 5000
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});