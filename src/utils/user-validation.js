const customValidator = require("validator");
const { userStatusEnum } = require("../shared/enums/userStatus");

function validateUserSignUpData(data) {
    let errors = [];
    if (!data?.name) {
        errors.push("Name is required");
    }
    if (!data?.email || !customValidator.isEmail(data.email)) {
        errors.push("Valid email is required");
    }
    if (!data?.password || !customValidator.isStrongPassword(data.password)) {
        errors.push("Strong password is required");
    }
    if (data?.phoneNumber && !customValidator.isMobilePhone(data.phoneNumber)) {
        errors.push("Valid phone number is required");
    }
    if (data.status && !Object.values(userStatusEnum).includes(data.status)) {
        errors.push("Invalid user status");
    }
    return errors;
}

function validateKeysInBody(req, model) {
    isValid = true;
    if (!req?.body || Object.keys(req.body).length === 0) {
        isValid = false;
        return isValid;
    }
    const keys = Object.keys(req.body);
    const modelKeys = Object.keys(model);
    isValid = keys.every(key => modelKeys.includes(key));
    return isValid;
}

module.exports = { validateUserSignUpData, validateKeysInBody };