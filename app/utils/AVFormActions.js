import { createAction } from 'redux-actions';

const checkRequired = (field) => {
  return (payload, state) => {
    let value;
    if (typeof payload.value !== 'undefined') {
      value = payload.value;
    } else {
      value = state[payload.formName][field].value;
    }
    if (typeof value === 'undefined') {
      return false;
    }
    if (typeof value === 'string' && value.trim() === '') {
      return false;
    }
    return true;
  };
};

const buildValidator = (field, rule, chain, validateCurrentState) => {
  const validator = rule.validator;
  let msg = 'The field is not valid';
  if (rule.errorMessage) {
    if (typeof rule.errorMessage == 'function') {
      msg = (payload, state) => {
        if (validateCurrentState) {
          return rule.errorMessage( state[payload.formName][field].value, state );
        }
        return rule.errorMessage( payload.value, state );
      };
    } else {
      msg = rule.errorMessage;
    }
  }
  if (typeof validator === 'object') {
    if (typeof validator.test === 'function') {
      return {
        field,
        func: (payload, state) => {
          if (validateCurrentState) {
            validator.test( state[payload.formName][field].value );
          }
          return validator.test( payload.value );
        },
        msg
      };
    } else {
      throw new Error( 'validators of type object must contain a function "test" that returns a boolean value' );
    }
  } else if (typeof validator === 'function') {
    return {
      field,
      chain,
      func: (payload, state) => {
        if (validateCurrentState) {
          return validator( state[payload.formName][field].value, state );
        }
        return validator( payload.value, state );
      },
      msg
    };
  } else if (typeof validator !== 'undefined') {
    throw new Error( 'validate must be either object with a function "test" or a function that returns a boolean value' );
  }
};

export const createAVFormSaveAction = (event, validation, payload) => {
  return createAction( event, payload => payload, (payload) => {
    if (validation) {
      let validators = [];
      Object.keys( validation ).forEach( field => {
        if (validation[field].required) {
          validators = [...validators, {
            field,
            chain: true,
            func: checkRequired( field ),
            msg: validation[field].requiredMessage || 'The field is required'
          }];
        }
        for (let i in validation[field].validators) {
          validators = [...validators, buildValidator( field, validation[field].validators[i], true, true )];
        }
      } );
      return {
        validator: {
          payload: validators
        }
      };
    }
  } );
};

export const createAVFormUpdateAction = (event, validation, payload) => {
  return createAction( event, payload => payload, (payload) => {
    let validators = [];
    if (validation && validation[payload.field]) {
      if (validation[payload.field].required) {
        validators = [...validators, {
          field: payload.field,
          func: checkRequired(),
          msg: validation[payload.field].requiredMessage || 'The field is required'
        }];
      }
      for (let i in validation[payload.field].validators) {
        const validator = validation[payload.field].validators[i];
        if (!validator.validateActions || validator.validateActions.indexOf( event ) > -1) {
          validators = [...validators, buildValidator( payload.field, validator )];
        }
      }
    }
    return {
      validator: {
        payload: validators
      }
    };
  } );
};

export const createAVFormResetAction = (event, payload) => {
  return createAction( event, payload => payload );
};

