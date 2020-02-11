import express from 'express';
import UserLocalController from '../../controllers/UserLocalController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validations/userOrParent';

const users = express.Router();

users.post(
    '/users',
    verifyToken,
    validateUser.create,
    asyncHandler(UserLocalController.create)
);


export default users;
