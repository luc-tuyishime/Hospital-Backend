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
        const { firstName, lastName, birth, sex, parentId } = req.body;
        const userId = req.user.id
        const newChild = await dbHelper.createOne({
            model: db.Child, data: { userId, firstName, lastName, birth, sex }
        });
        let childParent = await dbHelper.createOne({
            model: db.ChildParents, data: { parentId, childId: newChild.id }
        });

        if (childParent.errors) {
            return res.status(status.NOT_FOUND).json({
                message: `The parent with id ${parentId} doesn't exist`
            })
        }

        return res.status(status.CREATED).json({
            newChild: newChild,
            childParent: childParent
        });
    }
}
