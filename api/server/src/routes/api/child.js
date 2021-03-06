import express from 'express';
import ChildController from '../../controllers/ChildController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateChild from '../../middlewares/validations/child';
import checkIfAdmin from '../../middlewares/checkIfAdmin';

const children = express.Router();

children.post(
    '/children',
    verifyToken,
    validateChild.create,
    checkIfAdmin,
    asyncHandler(ChildController.create)
);

children.get(
    '/children',
    verifyToken,
    asyncHandler(ChildController.getAll)
);

children.get(
    '/vaccinated/children',
    verifyToken,
    asyncHandler(ChildController.getAllVaccinated)
);

children.get(
    '/child/:id',
    verifyToken,
    asyncHandler(ChildController.getOne)
);


export default children;
