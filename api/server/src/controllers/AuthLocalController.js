import 'dotenv/config';
import db from '../models';
import * as helper from '../helpers';
import status from '../config/status';
import * as dbHelper from '../helpers/dbQueries';

/**
 * A class to handle Hospital local authentication
 */
export default class AuthLocalController {
    /**
     * @description Hospital signup function
     * @param {object} req request from hospital
     * @param {object} res response from server
     * @return {object} Hospital information & token
     */
    static async signup(req, res) {
        const { name, email } = req.body;
        req.body.password = helper.password.hash(req.body.password);
        const newHospital = await dbHelper.createOne({ model: db.Hospital, data: req.body });
        const errors = newHospital.errors ? helper.checkCreateUpdateErrors(newHospital.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : (await helper.sendMail(email, 'newHospital', { email, name }))
            && res.status(status.CREATED).json({
                message: 'hospital created..',
                user: newHospital
            });
    }

    /**
 * @description - login Hospital function
 * @param {object} req user request
 * @param {object} res  response form server
 * @returns {object} Hospital token
 */
    static async login(req, res) {
        const { email, password } = req.body;
        const checkHospital = await dbHelper.findOne({ model: db.Hospital, where: { email } });
        if (checkHospital) {
            const comparePassword = helper.password.compare(password, checkHospital.password || '');
            if (!comparePassword) {
                return res.status(status.UNAUTHORIZED).json({
                    errors: { credentials: 'The credentials you provided are incorrect' }
                });
            }
            const payload = {
                id: checkHospital.id
            };
            delete checkHospital.password;
            return res.status(status.OK).json({
                message: 'signIn successfully',
                user: checkHospital,
                token: helper.token.generate(payload)
            });
        }
        return res.status(status.UNAUTHORIZED).json({
            errors: { credentials: 'The credentials you provided are incorrect' }
        });
    }

}
