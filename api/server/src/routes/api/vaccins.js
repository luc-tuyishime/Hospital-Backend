import express from 'express';
import VaccinController from '../../controllers/VaccinController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateVaccin from '../../middlewares/validations/vaccin';
import checkIfAdmin from '../../middlewares/checkIfAdmin';

const vaccins = express.Router();

vaccins.post(
    '/vaccins',
    verifyToken,
    checkIfAdmin,
    validateVaccin.create,
    asyncHandler(VaccinController.create)
);

vaccins.get(
    '/vaccins',
    verifyToken,
    checkIfAdmin,
    asyncHandler(VaccinController.getAll)
);

vaccins.get(
    '/vaccin/:id',
    verifyToken,
    checkIfAdmin,
    asyncHandler(VaccinController.getOne)
);



export default vaccins;
