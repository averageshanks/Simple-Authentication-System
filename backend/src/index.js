import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { checkDBConnection } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  await checkDBConnection();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }));

  // ✅ Diagnostic route
  app.get('/ping', (req, res) => res.send('pong'));

  // ✅ Auth routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);


  // ✅ Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
