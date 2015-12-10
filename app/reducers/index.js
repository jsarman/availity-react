import { combineReducers } from 'redux'
import { FIELD_UPDATE, SHOW_TOOLTIPS } from '../actions'

const initialUISettingsState = {
    enableTooltips: false
};

const initialUserProfile = {
    name: '',
    dob: '',
    stateCode: ''
}

function uiSettings(state = initialUISettingsState, action) {
    switch (action.type) {
    case SHOW_TOOLTIPS:
        return Object.assign({}, state, {
            enableTooltips: action.enableTooltips
        });
    default:
        return state
    }
}

function userProfile(state = initialUserProfile, action) {
    switch (action.type) {
    case FIELD_UPDATE:
        let update = {};
        update[action.field] = action.value;
        return Object.assign({}, state, update);
    default:
        return state
    }
}


const rootReducer = combineReducers({
    uiSettings,
    userProfile
})

export default rootReducer