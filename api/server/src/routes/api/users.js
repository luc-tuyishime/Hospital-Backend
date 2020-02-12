import express from 'express';
import UserController from '../../controllers/UserController';
import asyncHandler from '../../middlewares/asyncHandler';
import verifyToken from '../../middlewares/verifyToken';
import validateUser from '../../middlewares/validations/userOrParent';
import validateLogin from '../../middlewares/validateLogin';

const users = express.Router();

users.post(
    '/users',
    verifyToken,
    validateUser.create,
    asyncHandler(UserController.create)
);

// user login route
users.post('/login/user', validateLogin, asyncHandler(UserController.login));


export default users;
