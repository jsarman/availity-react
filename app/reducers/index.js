import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { FIELD_UPDATE, SHOW_TOOLTIPS } from '../actions'
import { isDate } from 'validator'

const initialUISettingsState = {
    enableTooltips: false
};

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

const uiSettings = handleActions({
    SHOW_TOOLTIPS: (state, action) => (
    Object.assign({}, state, {
            enableTooltips: action.payload
        })
    )
}, initialUISettingsState)


const userProfile = handleActions({
    FIELD_UPDATE: (state, action) => {
        let errors;
        if (action.payload.hasError) {
            errors = {
                message: action.payload.errors
            }
        }
        return Object.assign({}, state, {
            [action.payload.field]: Object.assign(state[action.payload.field], {
                value: action.payload.value,
                errors: errors
            })
        })
    }
}, initialUserProfile)

const rootReducer = combineReducers({
    uiSettings,
    userProfile
})

export default rootReducer