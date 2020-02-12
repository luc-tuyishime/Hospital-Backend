import express from 'express';
import users from './users';
import children from './child';

const router = express.Router();

router.use(users);
router.use(children);

export default router;