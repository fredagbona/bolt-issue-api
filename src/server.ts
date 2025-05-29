import express from 'express';
import cors from 'cors';
//import reportRoutes from './routes/reportRoutes';
import { config } from './config';

const app = express();
app.use(cors());
app.use(express.json());
//app.use('/api', reportRoutes);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
