import express from 'express';
import users from './users';
import children from './child';
import Parent from './parents';

const router = express.Router();

router.use(users);
router.use(children);
router.use(Parent);

export default router;