import 'dotenv/config';
import db from '../models';
import status from '../config/status';
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
                errors: `The parent with id ${parentId} doesn't exist`
            })
        }

        return res.status(status.CREATED).json({
            message: 'Child created and associated to parent..',
            newChild: newChild,
            childParent: childParent
        });
    }


    /**
* @description - getAll children with associated children function
* @param {object} req children request
* @param {object} res response form server
*/
    static async getAll(req, res) {
        const userId = req.user.id;
        const getAll = await dbHelper.findAll({
            model: db.Child, where: { userId }, include: [
                {
                    model: db.Parent,
                    as: 'parents',
                    attributes: ['id', 'firstName', 'phone'],
                    through: { attributes: [] }
                }
            ]
        });

        return getAll ?
            res.status(status.OK).json({
                message: 'All children with associated Parents..',
                children: getAll
            }) :
            res.status(status.NOT_FOUND).json({
                message: 'No children found...'
            });
    }

    /**
* @description - getOne child with associated children function
* @param {object} req child request
* @param {object} res response form server
*/
    static async getOne(req, res) {
        const userId = req.user.id;
        const id = req.params.id;
        const getOne = await dbHelper.findOne({
            model: db.Child, where: { userId, id }, include: [
                {
                    model: db.Parent,
                    as: 'parents',
                    attributes: ['id', 'firstName', 'phone'],
                    through: { attributes: [] }
                }
            ]
        });

        return getOne
            ? res.status(status.OK).json({
                message: 'Child with associated Parents..',
                child: getOne
            })
            : res
                .status(status.NOT_FOUND)
                .json({ errors: { child: `sorry, child with id ${req.params.id} is not found!!` } });

    }


    /**
* @description - getAll vaccinated children
* @param {object} req children request
* @param {object} res response form server
*/
    static async getAllVaccinated(req, res) {
        const userId = req.user.id;
        const getAll = await dbHelper.findAll({
            model: db.SaveChild, where: { userId }
        });

        return getAll ?
            res.status(status.OK).json({
                message: 'All vaccinated children',
                children: getAll
            }) :
            res.status(status.NOT_FOUND).json({
                message: 'No vaccinated children found...'
            });
    }
}
