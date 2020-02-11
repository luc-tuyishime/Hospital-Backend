import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as helper from '../helpers';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle actions performed on Users 
 */
export default class UserLocalController {
    /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
    static async create(req, res) {
        const hospitalId = req.user.id;
        const { firstName, lastName, username, email, phone } = req.body;
        const newUser = await dbHelper.createOne({ model: db.User, data: { hospitalId, firstName, lastName, username, email, phone } });
        const errors = newUser.errors ? helper.checkCreateUpdateErrors(newUser.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : res.status(status.CREATED).json({
                message: 'user created..',
                user: newUser
            });
    }
}
