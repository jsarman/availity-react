import { handleActions } from 'redux-actions';

export const createAVFormReducer = (saveEvent, updateEvent, resetEvent, initialState) => {
  return handleActions( {
    [saveEvent]: (state, action) => {
      let newState = Object.assign( {}, state );
      if (action.errors) {
        Object.keys( newState ).forEach( field => {
          let error = action.errors[field];
          newState[field] = Object.assign( newState[field], {
            errors: error
          } );
        } );
      }
      return newState;
    },
    [updateEvent]: (state, action) => {
      let errors;
      if (action.errors && action.errors[action.payload.field]) {
        errors = {
          message: action.errors[action.payload.field].message
        };
      }
      return Object.assign( {}, state, {
        [action.payload.field]: Object.assign( state[action.payload.field], {
          value: action.payload.value,
          errors: errors
        } )
      } );
    },
    [resetEvent]: (state, action) => {
      let newState = Object.assign( {}, state );
      Object.keys( state ).forEach( key => {
        newState[key].value = '';
        newState[key].errors = '';
      } );
      return newState;
    }
  }, initialState );
};