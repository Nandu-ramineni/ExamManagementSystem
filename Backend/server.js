import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './Config/db.js';
import authRoutes from './Routes/authRoutes.js'
import examRoutes from './Routes/examRoutes.js'
import questionRoutes from './Routes/questionRoutes.js'
import resultRoutes from './Routes/resultRoutes.js'
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT;

connectDB();

app.get('/', (req, res) => {
    res.send('Hello From EMS Backend');
});

app.listen(PORT, '::',() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});