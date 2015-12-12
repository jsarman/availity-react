import { createAction, handleActions } from 'redux-actions';

export const SHOW_TOOLTIPS = 'SHOW_TOOLTIPS'

const initialUISettingsState = {
    enableTooltips: false
};

export const uiSettings = handleActions({
    SHOW_TOOLTIPS: (state, action) => (
    Object.assign({}, state, {
            enableTooltips: action.payload
        })
    )
}, initialUISettingsState)

export const enableTooltipsAction = createAction(SHOW_TOOLTIPS)