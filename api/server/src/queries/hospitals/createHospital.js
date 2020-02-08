import db from '../../models';

/**
 * @param {object} user
 * @returns {object} an object containing the information of the user or null
 */
export default async (hospital = {}) => {
    try {
        const newHospital = await db.Hospital.create(hospital, { logging: false });

        return newHospital.dataValues;
    } catch (error) {
        return {
            errors: error
        };
    }
};
