import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as helper from '../helpers';
import * as dbHelper from '../helpers/dbQueries';

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
}
