import express from 'express';
import AuthLocalController from '../../controllers/AuthLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import validateUser from '../../middlewares/validateHospital';



const router = express.Router();

router.post(
    '/signup',
    validateUser,
    asyncHandler(AuthLocalController.signup)
);



export default router;
