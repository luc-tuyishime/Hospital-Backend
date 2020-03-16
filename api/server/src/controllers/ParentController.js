import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as helper from '../helpers';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle actions performed on Users 
 */
export default class ParentController {
    /**
   * @param {object} Parent req Request sent to the route
   * @param {object} res Response from server
   * @returns {object} Object representing the response returned
   */
    static async create(req, res) {
        const userId = req.user.id
        const { firstName, lastName, email, phone } = req.body;
        const newParent = await dbHelper.createOne({
            model: db.Parent, data: { userId, firstName, lastName, email, phone }
        });
        const errors = newParent.errors ? helper.checkCreateUpdateErrors(newParent.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : res.status(status.CREATED).json({
                message: 'parent created.. please create a child',
                parent: newParent
            });
    }
}
