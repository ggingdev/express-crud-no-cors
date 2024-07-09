import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { AppDataSource } from './data-source';

const app = express();
const PORT = 3001;

// app.use(cors());
app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  app.use('/api/users', userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => console.log(error));
