import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter.js';
import postRouter from './routes/postRouter.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import errorCatcher from './middleware/errorCatcher.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));

// Define the allowed origins
const allowedOrigins = [
  (`http://localhost:${process.env.FRONTEND_PORT}`),       // Your local frontend (adjust port as needed)
  `${process.env.LIVE_FRONTEND_ADDRESS}`    // Your Render backend or frontend domain if applicable
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    
    // Allow if the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Otherwise, block the request
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// app.use(cors({
//   origin: true, // This will allow all origins
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/user", userRouter);

app.use(errorCatcher);

// Run when Starting server

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
})