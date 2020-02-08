import status from '../config/status';

/**
 * @param {object} err
 * @returns {object} an object containing descriptive error messages
 */
export default (err = {}) => {
    const errors = {};
    if (err.name === 'SequelizeUniqueConstraintError') {
        if (err.fields.email) {
            errors.email = 'email already used';
        }

        if (err.fields.name) {
            errors.name = 'name already used';
        }

        return { errors, code: status.EXIST };
    }
    return {
        errors: err.message,
        code: err.name === 'SequelizeValidationError' ? status.BAD_REQUEST : status.SERVER_ERROR
    };
};
