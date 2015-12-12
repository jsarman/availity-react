import { handleActions } from 'redux-actions';
import { FIELD_UPDATE } from '../actions'

const initialUserProfile = {
    name: '',
    dob: '',
    stateCode: ''
}

export const updateField = createAction(FIELD_UPDATE, payload => payload, (payload,state) => ({
        validator: {
            payload: [
                {
                    func: validateUserProfileFields
                }
            ]
        }
}))

const userProfile = handleActions({
    FIELD_UPDATE: (state, action) => (
    Object.assign({}, state, {
            [action.payload.field]: Object.assign(state[action.payload.field], {
                value: action.payload.value,
                pristine: false
            })
        })
    )
}, initialUserProfile)