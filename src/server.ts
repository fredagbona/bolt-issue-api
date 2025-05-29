// src/server.ts
import express from 'express';
import cors from 'cors';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';
import { log } from './utils/logger';

export const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', reportRoutes);
app.use(errorHandler);

if (require.main === module) {
  const PORT = config.port;
  app.listen(PORT, () => {
    log.info(`🚀 Server running on port ${PORT}`);
  });
}
