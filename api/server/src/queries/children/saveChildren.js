import db from '../../models';

/**
 * @param {string} token
 * @param {int} userId
 * @returns {object} return the saved token
 */
export default async (userId = 0, firstName = '', lastName = '', birth, sex = '') => {
    try {
        const newChild = await db.SaveChild.findOrCreate({
            where: { userId, firstName, lastName, birth, sex },
            logging: false
        });

        return [newChild[0].get(), newChild[1]];;
    } catch (error) {
        return {
            errors: error
        };
    }
};
