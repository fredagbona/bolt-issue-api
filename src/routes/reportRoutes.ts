import { Router } from 'express';
import { createIssue } from '../controllers/reportController';

const router = Router();

router.post('/report', createIssue);

export default router;
