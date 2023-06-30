import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB  from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
//setting up dotenv
//helps in accessing the environment variables from dotenv file
dotenv.config();

//setting up express application
const app = express();
app.timeout = 60000;
app.use(cors());
app.use(express.json({ limit: '50mb' }));

//these are called api endpoints which will be used by the frontend
app.use('/api/v1/post',postRoutes);
// app.use('/api/v1/dalle',dalleRoutes);

//to get to know that our application is running whenever we visit the url
app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from GEN.AI!',
    });
  });

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();

//way to run it