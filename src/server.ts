import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';
import { log } from './utils/logger';

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', reportRoutes);

// Global error handler
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
});
