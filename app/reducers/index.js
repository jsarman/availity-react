import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { FIELD_UPDATE, SHOW_TOOLTIPS } from '../actions'

const initialUISettingsState = {
    enableTooltips: false
};

const initialUserProfile = {
    name: '',
    dob: '',
    stateCode: ''
}

const uiSettings = handleActions({
    SHOW_TOOLTIPS: (state, action) => (
    Object.assign({}, state, {
            enableTooltips: action.payload
        })
    )
}, initialUISettingsState)


const userProfile = handleActions({
    FIELD_UPDATE: (state, action) => (
    Object.assign({}, state, {
            [action.payload.field]: action.payload.value
        })
    )
}, initialUserProfile)

const rootReducer = combineReducers({
    uiSettings,
    userProfile
})

export default rootReducer