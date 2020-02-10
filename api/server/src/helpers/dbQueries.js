
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

export const createOne = async ({ model, data = {} }) => {
    try {
        const create = await model.create(data);
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

export const update = async ({ model, data = {}, where = {} }) =>
    model.update(data, { where, returning: true });