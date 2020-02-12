import express from 'express';
import AuthController from '../../controllers/AuthController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateUser from '../../middlewares/validateHospital';

const router = express.Router();

router.post(
    '/signup',
    validateUser,
    asyncHandler(AuthController.create)
);

export default router;
