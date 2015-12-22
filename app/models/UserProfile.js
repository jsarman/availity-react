import { createAVFormReducer } from '../utils/AVFormReducer';
import { createAVFormSaveAction, createAVFormUpdateAction, createAVFormResetAction } from '../utils/AVFormActions';
import { isEmail, isLength } from 'validator';

const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
const SAVE_USER_PROFILE = 'SAVE_USER_PROFILE';
const RESET_USER_PROFILE = 'RESET_USER_PROFILE';

const initialUserProfile = {
  name: {
    value: ''
  },
  email: {
    value: ''
  },
  subscribe: {
    value: false
  },
  dob: {
    value: ''
  },
  stateCode: {
    value: ''
  }
};

/**
Validation example.  
   match the object key to a key in the state object.
   set a required if you would like the field to be required.  You can optionally set a required message.
   provide an array of validators for multiple validations.
   The first validator to fail will set the message.
   validator can be an object with a function test, or a function. In both cases the return value must be a boolean
   true for valid false for invalid.
   If the validator is a function the form input current value and the current state of the system are passed to the function.
   the optional error message can either be a string or a function that returns a string.
   if a function is found the function will be called with the value and state like the validator.
    validators can also use validateActions to only validate if the action exists in the array.
    if it is not specified then validation occurs for all actions.
*/

const validation = {
  name: {
    required: true,
    requiredMessage: 'Please enter a username that is at least 3 characters long',
    validators: [{
      validator: /^[a-z\s]*$/i, //regex is a valid validator
      errorMessage: value => 'The username \'' + value + '\' can only contain letters.'
    }, {
      validateActions: [SAVE_USER_PROFILE], //only check this at save so the error message doesn't appear when user starts to type.
      validator: value => isLength( value, 3 ),
      errorMessage: value => 'The username \'' + value + '\' has to be at least three characters long.'
    }]
  },
  email: {
    validators: [{
      validateActions: [SAVE_USER_PROFILE], //only check this at save so the error message doesn't appear when user starts to type.
      validator: (value, state) => {
        if (!value || value.trim() === '') {
          return !state.userProfile.subscribe.value; //not required if not going to subscribe to newsletter
        }
        return isEmail( value ); //invalidate if bad email.
      },
      errorMessage: (value, state) => {
        if (!value || value.trim() === '') {
          return 'A valid email is required to subscribe to the newsletter.';
        }
        return 'The email \'' + value + '\' is invalid';
      }
    }]
  },
  dob: {
    required: true,
    validators: [{
      validator: value => moment( value, 'mm/dd/yyyy' ).isValid(),
      errorMessage: 'The Date must be in format MM/DD/YYYY'
    }]
  },
  stateCode: {
    required: true,
    requiredMessage: 'Please select a State'
  }
};

// Create a reducer for the userProfile this is used in the reducers folder as one of the combineReducers (this is a redux thing.)
export const userProfile = createAVFormReducer( SAVE_USER_PROFILE, UPDATE_USER_PROFILE, RESET_USER_PROFILE, initialUserProfile );

// Create actions that can be performed on the userProfile
export const saveUserProfileAction = createAVFormSaveAction( SAVE_USER_PROFILE, validation );
export const updateUserProfileAction = createAVFormUpdateAction( UPDATE_USER_PROFILE, validation );
export const resetUserProfileAction = createAVFormResetAction( RESET_USER_PROFILE );
