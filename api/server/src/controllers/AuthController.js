import 'dotenv/config';
import db from '../models';
import * as helper from '../helpers';
import status from '../config/status';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle Hospital local authentication
 */
export default class AuthController {
    /**
     * @description Hospital signup function
     * @param {object} req request from hospital
     * @param {object} res response from server
     * @return {object} Hospital information & token
     */
    static async create(req, res) {
        const { name, email } = req.body;
        req.body.password = helper.password.hash(req.body.password);
        const newHospital = await dbHelper.createOne({ model: db.Hospital, data: req.body });
        const errors = newHospital.errors ? helper.checkCreateUpdateErrors(newHospital.errors) : null;

        const payload = {
            id: newHospital.id,
        };

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : delete newHospital.password && (await helper.sendMail(email, 'newHospital', { email, name }))
            && res.status(status.CREATED).json({
                message: 'hospital created. Please create a User',
                hospital: newHospital,
                token: helper.token.generate(payload)
            });
    }

}
