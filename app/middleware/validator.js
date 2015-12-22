const defaultOptions = {
  key: 'meta'
};

export default function(options = defaultOptions) {
  const validatorMiddleware = store => next => action => {
        if (!action[options.key] || !action[options.key].validator) {
          return next( action );
        }

        // nextPayload
        let nextAction;
        let nextPayload;
        try {
          nextPayload = action.payload.nextPayload;
        } catch ( e ) {}
        if (nextPayload !== undefined) {
          nextAction = Object.assign( {}, action );
          nextAction.payload = nextPayload;
        }
        // -----------

        let hasErrors = false;

        let validators = action[options.key].validator;

        const runValidator = (validator) => {
          let valid, message;
          if (typeof validator.func === 'function') {
            valid = validator.func( action.payload, store.getState() );
          } else {
            throw new Error( 'validator func is needed' );
          }
          if (typeof valid !== 'boolean') {
            throw new Error( 'validator func must return boolean type' );
          }
          if (!valid) {
            hasErrors = true;
            if (typeof msg === 'function') {
              message = validator.msg( action.payload, store.getState() );
            } else {
              message = validator.msg || '';
            }
            return {
              valid,
              message
            };
          }
        };

        const runValidatorContainer = (validator) => {
          let validationResults = {};

          if (Array.prototype.isPrototypeOf( validator )) {
            for (let j in validator) {
              let item = validator[j];
              let results = runValidator( item );
              if (results && !validationResults[item.field]) {
                validationResults = Object.assign( validationResults, {
                  [item.field]: results
                } );
                if (!item.chain) {
                  break;
                }
              }
            }
          } else {
            validationResults = runValidator( validator );
          }
          return validationResults;
        };


        // payload
        let errors;
        const payloadValidator = validators.payload;
        if (payloadValidator) {
          errors = runValidatorContainer( payloadValidator );
        }

        action = nextAction || action;
        if (hasErrors) {
          action.errors = errors;
        }
        return next( action );
  };

  return validatorMiddleware;
}
