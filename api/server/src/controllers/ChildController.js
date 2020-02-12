import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as helper from '../helpers';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle actions performed on Users 
 */
export default class ChildController {
    /**
   * @param {object} req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
    static async create(req, res) {
        const { firstName, lastName, birth, sex } = req.body;
        const userId = req.user.id
        const newChild = await dbHelper.createOne({ model: db.Child, data: { userId, firstName, lastName, birth, sex } });
        const errors = newChild.errors ? helper.checkCreateUpdateErrors(newChild.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : res.status(status.CREATED).json({
                message: 'child created..',
                child: newChild
            });
    }
}
