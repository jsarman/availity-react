import { createAVFormReducer } from '../utils/AVFormReducer'
import { createAVFormUpdateAction } from '../utils/AVFormActions'
import { isDate } from 'validator'

const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'

const initialUserProfile = {
    name: {
        value: '',
        validation: {
            required: true,
            validator: /^[a-z\s]*$/i,
            errorMessage: 'The username can only contain letters.'
        }
    },
    dob: {
        value: '',
        validation: {
            required: true,
            validator: isDate,
            errorMessage: 'The Date must be in format MM-DD-YYYY'
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

export const userProfile = createAVFormReducer(UPDATE_USER_PROFILE, initialUserProfile);
export const updateUserProfileAction = createAVFormUpdateAction(UPDATE_USER_PROFILE);