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
        username: Joi.string()
            .min(5)
            .max(255)
            .required(),
        email: Joi.string()
            .min(5)
            .max(100)
            .required(),
        password: Joi.string()
            .min(8)
            .max(100)
            .required(),
        role: Joi.string()
            .min(5)
            .max(100),
        phone: Joi.string()
            .regex(/^\+\d{1,12}$/)
            .required()
    });

    return Joi.validate(input, schema, { abortEarly: false });
};
