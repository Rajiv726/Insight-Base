import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Config/db';
import userRoutes from './Routes/userRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (_req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
