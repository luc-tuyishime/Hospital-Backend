import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateUser from '../../middlewares/validateHospital';
import validateLogin from '../../middlewares/validateLogin';


const router = express.Router();

router.post(
    '/signup',
    validateUser,
    asyncHandler(AuthLocalController.signup)
);

// user login route
router.post('/login', validateLogin, asyncHandler(AuthLocalController.login));


export default router;
