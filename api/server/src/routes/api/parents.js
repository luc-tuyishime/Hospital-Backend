import express from 'express';
import ParentController from '../../controllers/ParentController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateParent from '../../middlewares/validations/parent';
import checkIfAdmin from '../../middlewares/checkIfAdmin';
import checkNumberComplete from '../../middlewares/checkNumberComplete';

const parents = express.Router();

parents.post(
    '/parents',
    verifyToken,
    validateParent.create,
    checkIfAdmin,
    checkNumberComplete,
    asyncHandler(ParentController.create)
);

parents.get(
    '/parents',
    verifyToken,
    checkIfAdmin,
    asyncHandler(ParentController.getAll)
);


export default parents;
