import { createAVFormReducer } from '../utils/AVFormReducer'
import { createAVFormUpdateAction, createAVFormResetAction } from '../utils/AVFormActions'
import { isEmail } from 'validator'

const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
const RESET_USER_PROFILE = 'RESET_USER_PROFILE'

const initialUserProfile = {
    name: {
        value: '',
        validation: {
            required: true,
            validator: /^[a-z\s]*$/i,
            errorMessage: 'The username can only contain letters.'
        }
    },
    email: {
        value: '',
        validation: {
            required: true,
            validator: value => isEmail(value),
            errorMessage: 'The email is invalid.'
        }
    },
    dob: {
        value: '',
        validation: {
            required: true,
            validator: value => moment(value, 'mm/dd/yyyy').isValid(),
            errorMessage: 'The Date must be in format MM/DD/YYYY'
        }
    },
    stateCode: {
        value: '',
        validation: {
            required: true,
            requiredMessage: 'Please select a State'
        }
    }
}

export const userProfile = createAVFormReducer(UPDATE_USER_PROFILE, RESET_USER_PROFILE, initialUserProfile);
export const updateUserProfileAction = createAVFormUpdateAction(UPDATE_USER_PROFILE);
export const resetUserProfileAction = createAVFormResetAction(RESET_USER_PROFILE);