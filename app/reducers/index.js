import { combineReducers } from 'redux'
import { uiSettings } from '../models/UISettings'
import { userProfile } from '../models/UserProfile'

const rootReducer = combineReducers({
    uiSettings,
    userProfile
})

export default rootReducer