import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as helper from '../helpers';
import * as dbHelper from '../helpers/dbQueries';
import * as validate from '../helpers/validation';

/**
 * A class to handle actions performed on Users 
 */
export default class UserController {

    /**
     * @param {object} User req Request sent to the route
     * @returns {object} Object representing the response returned
     */
    static async create(req, res) {
        const hospitalId = req.hospital.id;
        console.log(hospitalId);
        const { firstName, lastName, username, email, role, phone } = req.body;
        req.body.password = helper.password.hash(req.body.password);
        const password = req.body.password;
        const newUser = await dbHelper.createOne({
            model: db.User, data: {
                hospitalId, firstName, lastName,
                username, email, password, role, phone
            }
        });

        const errors = newUser.errors ? helper.checkCreateUpdateErrors(newUser.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : delete newUser.password && res.status(status.CREATED).json({
                message: 'user created please Login...',
                user: newUser
            });
    }



    /**
    * @description - login user function
    * @param {object} req user request
    * @param {object} res  response form server
    * @returns {object} user token
    */
    static async login(req, res) {
        const { email, password } = req.body;
        const checkUser = await dbHelper.findOne({ model: db.User, where: { email } });
        if (Object.keys(checkUser).length > 0) {
            const comparePassword = helper.password.compare(password, checkUser.password || '');
            if (!comparePassword) {
                return res.status(status.UNAUTHORIZED).json({
                    errors: { credentials: 'The credentials you provided are incorrect' }
                });
            }
            const payload = {
                id: checkUser.id,
                role: checkUser.role
            };
            const token = helper.token.generate(payload)
            delete checkUser.password;
            return res.status(status.OK).json({
                message: 'signIn successfully',
                user: checkUser,
                token
            });
        }

        return res.status(status.UNAUTHORIZED).json({
            errors: { credentials: 'The credentials you provided are incorrect' }
        });
    }

    /**
     * @param  {object} req
     * @param  {object} res
     * @return {object} return an object containing the confirmation message
     */
    static async sendEmail(req, res) {
        const { email } = req.body;
        const result = await dbHelper.findOne({ model: db.User, where: { email } }); // check if the email exist
        if (Object.keys(result).length <= 0) {
            return res.status(status.NOT_FOUND).json({
                errors: 'email not found..'
            });
        }

        await helper.sendMail(email, 'resetPassword', {
            email,
            names: `${result.firstName} ${result.lastName}`
        }); // send mail

        return res.status(status.OK).json({
            message: 'Email sent, please check your email'
        });
    }


    /**
     * @param  {object} req
     * @param  {object} res
     * @return {object} return an object containing the confirmation message
     */
    static async updatePassword(req, res) {
        const token = req.body.token || req.params.token;
        const { newPassword, confirmNewPassword } = req.body;

        if (newPassword !== confirmNewPassword) {
            return res.status(status.BAD_REQUEST).json({ errors: 'Passwords are not matching' });
        }

        if (!newPassword || !confirmNewPassword) {
            return res.status(status.BAD_REQUEST).json({ errors: 'the password can not be empty' });
        }

        const isPasswordValid = validate.password(newPassword, 'required');
        const isPasswordValidTwo = validate.password(confirmNewPassword, 'required');

        if (isPasswordValid.length || isPasswordValidTwo.length) {
            return res.status(status.BAD_REQUEST).json({ message: isPasswordValid[0] });
        }
        const { email } = helper.token.decode(token);
        const isUpdated = await dbHelper.update({
            model: db.User, data: { password: helper.password.hash(newPassword) },
            where: { email }
        });
        delete isUpdated.password;
        return isUpdated
            ? res
                .status(status.OK)
                .json({ isUpdated, message: 'Success! your password has been changed.' })
            : res.status(status.NOT_MODIFIED).json({ errors: 'Password not updated' });
    }
}
