import { handleActions } from 'redux-actions';

export function createAVFormReducer(updateEvent, resetEvent, initialState) {
    return handleActions({
        [updateEvent]: (state, action) => {
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
        },
        [resetEvent]: (state, action) => {
            Object.keys(state).forEach(key => {
                state[key].value = '';
                state[key].errors = ''
            });
            return Object.assign({}, state);
        }
    }, initialState)
}