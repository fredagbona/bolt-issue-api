import { Router } from 'express';
import { createIssue } from '../controllers/reportController';
import { validate } from '../middleware/validate';
import { issueSchema } from '../schemas/reportSchema';

const router = Router();

router.post('/report', validate(issueSchema), createIssue);

export default router;
