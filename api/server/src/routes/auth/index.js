import express from 'express';
import local from './local';
import logout from '../../middlewares/logout';
import verifyToken from '../../middlewares/verifyToken';


const router = express.Router();

router.use('/', local);
router.get('/logout', verifyToken, logout);


export default router;
