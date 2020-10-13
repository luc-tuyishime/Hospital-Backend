import express from 'express';
import users from './users';
import children from './child';
import Parent from './parents';
import vaccin from './vaccins';

const router = express.Router();

router.use(users);
router.use(children);
router.use(Parent);
router.use(vaccin);

export default router;