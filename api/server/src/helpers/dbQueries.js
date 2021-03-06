
export const findOne = async ({ model, where = {}, include }) => {
    const result = await model.findOne({
        where,
        include,
    });
    return result && result.get() ? result : null;
};

export const findAll = async ({
    model,
    where,
    limit = 25,
    offset = 0,
    include,
}) =>
    model.findAll({
        offset,
        limit,
        where,
        include,
    });

export const createOne = async ({ model, data = {}, include = {} }) => {
    try {
        const create = await model.create(data, include);
        return create.dataValues
    } catch (error) {
        return {
            errors: error
        }
    }
}

export const deleteOne = async ({ model, where }) =>
    model.destroy({
        where,
    });

export const update = async ({ model, data = {}, where = {} }) => {
    try {
        const update = await model.update(data, { where, returning: true });
        return update[0] ? update[1][0].get() : {};
    } catch (error) {
        return {
            errors: error
        };
    }
}