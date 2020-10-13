import express from 'express';
import AuthController from '../../controllers/AuthController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateUser from '../../middlewares/validateHospital';
import validateLogin from '../../middlewares/validateLogin';

const router = express.Router();

router.post(
    '/signup',
    validateUser,
    asyncHandler(AuthController.create)
);

router.post(
    '/login',
    validateLogin,
    asyncHandler(AuthController.login)
);

export default router;
