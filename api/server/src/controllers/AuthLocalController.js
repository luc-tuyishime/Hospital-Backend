import 'dotenv/config';
import { Hospital } from '../queries';
import * as helper from '../helpers';
import status from '../config/status';


/**
 * A class to handle user local authentication
 */
export default class AuthLocalController {
    /**
     * @description user signup function
     * @param {object} req request from user
     * @param {object} res response from server
     * @return {object} user information & token
     */
    static async signup(req, res) {
        const { name, email } = req.body;
        req.body.password = helper.password.hash(req.body.password);
        const newHospital = await Hospital.create(req.body);
        const errors = newHospital.errors ? helper.checkCreateUpdateHospitalErrors(newHospital.errors) : null;

        return errors
            ? res.status(errors.code).json({ errors: errors.errors })
            : (await helper.sendMail(email, 'newHospital', { email, name }))
            && res.status(status.CREATED).json({
                message: 'hospital created..',
                user: newHospital
            });
    }

}
