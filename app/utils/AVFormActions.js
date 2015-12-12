import { createAction } from 'redux-actions'

function getField(payload, state) {
    return state[payload.formName][payload.field];
}

function validateRequiredIsOk(payload, state) {
    const field = getField(payload, state);
    if (field.validation) {
        if (field.validation.required) {
            if (typeof payload.value === 'undefined') {
                return false;
            }
            if (typeof payload.value === 'string' && payload.value.trim() === '') {
                return false;
            }
        }
    }
    return true;
}

function validateField(payload, state) {
    if (!payload.validate) {
        return true;
    }
    const field = getField(payload, state);
    if (field.validation) {
        if (!validateRequiredIsOk(payload, state)) {
            return false;
        }
        const validator = field.validation.validator;
        if (typeof validator === 'object') {
            if (typeof validator.test === 'function') {
                return field.validation.validator.test(payload.value);
            } else {
                throw new Error('validators of type object must contain a function "test" that returns a boolean value');
            }
        } else if (typeof validator === 'function') {
            return validator(payload.value);
        } else if (typeof validator !== 'undefined') {
            throw new Error('validate must be either object with a function "test" or a function that returns a boolean value');
        }
    }
    return true;
}

function getErrorMessage(payload, state) {
    const field = getField(payload, state);
    if (field.validation) {
        if (!validateRequiredIsOk(payload, state)) {
            return field.validation.requiredMessage || 'The field is required'
        }
        return field.validation.errorMessage || 'The field is not valid'
    }
    return '';
}

export function createAVFormUpdateAction(event, payload) {
    return createAction(event, payload => payload, () => {
        return {
            validator: {
                payload: [
                    {
                        func: validateField,
                        msg: getErrorMessage
                    }
                ]
            }
        }
    })
}

export function createAVFormResetAction(event, payload) {
    return createAction(event, payload => payload);
}

