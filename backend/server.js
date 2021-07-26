import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import colors from 'colors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';


// ENV Variables during development
dotenv.config();

// mongoDB
connectDB();

// express
const app = express();
app.use(express.json());


// routes
app.use('/api/users', userRoutes);
app.use('/api/pi', productRoutes);

// Post Build
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} 

app.get('/', (req, res) => {
    res.send('API is running....');
  });


// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
