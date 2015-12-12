import { createAction } from 'redux-actions'

export const FIELD_UPDATE = 'FIELD_UPDATE'
export const SHOW_TOOLTIPS = 'SHOW_TOOLTIPS'

function validateRequiredIsOk(payload, state) {
    const field = state.userProfile[payload.field];
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

function validateUserProfileFields(payload, state) {
    if (!payload.validate) {
        return true;
    }
    const field = state.userProfile[payload.field];
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

function getUserProfileMessage(payload, state) {
    const field = state.userProfile[payload.field];
    if (field.validation) {
        if (!validateRequiredIsOk(payload, state)) {
            return field.validation.requiredMessage || 'The field is required'
        }
        return field.validation.errorMessage || 'The field is not valid'
    }
    return '';
}

export const updateField = createAction(FIELD_UPDATE, payload => payload, () => {
    return {
        validator: {
            payload: [
                {
                    func: validateUserProfileFields,
                    msg: getUserProfileMessage
                }
            ]
        }
    }
})

export const enableTooltips = createAction(SHOW_TOOLTIPS)
