import Joi from "joi";

export const validate = (objectToBeValidated: any, validationSchema: Joi.ObjectSchema<any>) => {

    const validationResult = validationSchema.validate(objectToBeValidated);

    if (validationResult.error) {
        throw {
            status: "error",
            statusCode: 400,
            message: validationResult.error.details[0].message.replaceAll("\"", "'"),
            data: validationResult.error.details
        };
    }

    return {
        status: "success",
        statusCode: 200,
        message: "Validation successful",
        data: validationResult.value
    }
}
