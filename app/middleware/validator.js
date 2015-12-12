/**
 * @fileOverview redux validator middleware
 * @author Max
 **/
const defaultOptions = {
    key: 'meta'
};

export default function(options = defaultOptions) {
    const validatorMiddleware = store => next => action => {
                if (!action[options.key] || !action[options.key].validator) {
                    return next(action);
                }

                // nextPayload
                let nextAction;
                let nextPayload;
                try {
                    nextPayload = action.payload.nextPayload;
                } catch ( e ) {}
                if (nextPayload !== undefined) {
                    nextAction = Object.assign({}, action);
                    nextAction.payload = nextPayload;
                }
                // -----------

                let flag = true;
                let errorParam, errorId, errorMsg;

                let validators = action[options.key].validator;

                const runValidator = (param, func, msg, id, key) => {
                    let flag;
                    if (func) {
                        flag = func(param, store.getState(), action.payload);
                    } else {
                        throw new Error('validator func is needed');
                    }
                    if (typeof flag !== 'boolean') {
                        throw new Error('validator func must return boolean type');
                    }
                    if (!flag) {
                        errorParam = param;
                        errorId = id;
                        if (typeof msg === 'function') {
                            errorMsg = msg(param, store.getState(), action.payload);
                        } else {
                            errorMsg = msg || '';
                        }
                    }

                    return flag;
                };

                const runValidatorContainer = (validator, param, key) => {
                    let flag;
                    if (Array.prototype.isPrototypeOf(validator)) {
                        for (let j in validator) {
                            let item = validator[j];
                            flag = runValidator(param, item.func, item.msg, j, key);
                            if (!flag) break;
                        }
                    } else {
                        flag = runValidator(param, validator.func, validator.msg, 0, key);
                    }
                    return flag;
                };

                if (typeof action.payload === 'object') {
                    for (let i in action.payload) {
                        let item = action.payload[i];

                        let validator = validators[i];
                        if (validator) {
                            flag = runValidatorContainer(validator, item, i);
                            if (!flag) break;
                        }
                    }
                }

                // payload
                const payloadValidator = validators.payload;
                if (payloadValidator) {
                    flag = runValidatorContainer(payloadValidator, action.payload, 'payload');
                }
                // -------

                // default
                const defaultValidator = validators.default;
                if (defaultValidator) {
                    flag = runValidatorContainer(defaultValidator, undefined, 'default');
                }
                // -------

                action = nextAction || action;
                if (!flag) {
                    action.payload = Object.assign(action.payload, {
                        hasError: true,
                        pristine: false,
                        errors: errorMsg
                    });
                }
                return next(action);
    };

    return validatorMiddleware;
}
