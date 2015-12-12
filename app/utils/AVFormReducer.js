import { handleActions } from 'redux-actions';

export function createAVFormReducer(event, initialState) {
    return handleActions({
        [event]: (state, action) => {
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
    }, initialState)
}