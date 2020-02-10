import Joi from 'joi';

export default (input) => {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(2)
            .max(45)
            .required()
            .label('Name'),
        email: Joi.string()
            .min(5)
            .max(100)
            .required(),
        password: Joi.string()
            .min(8)
            .max(100)
            .required()
    });

    return Joi.validate(input, schema, { abortEarly: false });
};
