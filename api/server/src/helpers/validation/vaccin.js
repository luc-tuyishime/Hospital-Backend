import Joi from 'joi';

export default (input) => {
    const schema = Joi.object().keys({
        childId: Joi.number().required(),
        type: Joi.string()
            .min(5)
            .max(255)
            .required(),
        vaccinationDate: Joi.date()
            .min('1-1-2000')
            .iso()
            .required(),

    });

    return Joi.validate(input, schema, { abortEarly: false });
};
