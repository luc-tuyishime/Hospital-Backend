import express from 'express';
import ParentController from '../../controllers/ParentController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateParent from '../../middlewares/validations/parent';
import checkIfAdmin from '../../middlewares/checkIfAdmin';
import checkNumberComplete from '../../middlewares/checkNumberComplete';

const children = express.Router();

children.post(
    '/parents',
    verifyToken,
    validateParent.create,
    checkIfAdmin,
    checkNumberComplete,
    asyncHandler(ParentController.create)
);


export default children;
