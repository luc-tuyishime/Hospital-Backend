import 'dotenv/config';
import db from '../models';
import status from '../config/status';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle actions performed on Users 
 */
export default class VaccinController {

    /**
     * @param {object} Vaccin req Request sent to the route
     * @returns {object} Object representing the response returned
     */
    static async create(req, res) {
        const userId = req.user.id;
        const { childId, type, vaccinationDate } = req.body;
        const checkChild = await dbHelper.findOne({ model: db.Child, where: { id: childId } });

        if (checkChild) {
            const newVaccin = await dbHelper.createOne({
                model: db.Vaccin, data: {
                    userId, childId, type, vaccinationDate
                }
            });

            return res.status(status.CREATED).json({
                message: 'vaccin created..',
                vaccin: newVaccin
            })
        }
        return res.status(status.NOT_FOUND).json({
            errors: { message: `The child with id ${childId} doesn't exist` }
        })
    }

    /**
* @description -vaccin function
* @param {object} req vaccin request
* @param {object} res response form server
*/
    static async getAll(req, res) {
        const userId = req.user.id;
        const getAll = await dbHelper.findAll({
            model: db.Vaccin, where: { userId },
            include: [{
                model: db.Child,
                as: 'child',
                include: [{ model: db.Parent, as: 'parents' }]
            }]
        });

        return getAll ?
            res.status(status.OK).json({
                message: 'All vaccins..',
                vaccines: getAll
            }) :
            res.status(status.NOT_FOUND).json({
                message: 'No vaccins found...'
            });
    }


    /**
* @description - getOne vaccin function
* @param {object} req vaccin request
* @param {object} res response form server
*/
    static async getOne(req, res) {
        const userId = req.user.id;
        const id = req.params.id;
        const getOne = await dbHelper.findOne({
            model: db.Vaccin, where: { userId, id },
        });

        return getOne
            ? res.status(status.OK).json({
                message: 'Vaccin..',
                child: getOne
            })
            : res
                .status(status.NOT_FOUND)
                .json({ errors: { child: `sorry, vaccin with id ${req.params.id} is not found!!` } });

    }
}
