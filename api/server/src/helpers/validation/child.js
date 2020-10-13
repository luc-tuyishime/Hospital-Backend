import Joi from 'joi';

export default (input) => {
    const schema = Joi.object().keys({
        firstName: Joi.string()
            .min(5)
            .max(255)
            .required(),
        lastName: Joi.string()
            .min(5)
            .max(255)
            .required(),
        birth: Joi.date()
            .iso()
            .required(),
        sex: Joi.string()
            .min(4)
            .max(6),
        parentId: Joi.number().required()
    });

    return Joi.validate(input, schema, { abortEarly: false });
};
