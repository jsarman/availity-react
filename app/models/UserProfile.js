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

const validation = {
  name: {
    required: true,
    requiredMessage: 'Please enter a name',
    validators: [{
      validator: /^[a-z\s]*$/i,
      errorMessage: 'The username can only contain letters.'
    }, {
      validateActions: [SAVE_USER_PROFILE],
      validator: value => isLength( value, 3 ),
      errorMessage: 'The username has to be at least three characters long.'
    }]
  },
  email: {
    required: true,
    validators: [{
      validateActions: [SAVE_USER_PROFILE],
      validator: value => {
        return isEmail( value );
      },
      errorMessage: 'The email is invalid.'
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

export const userProfile = createAVFormReducer( SAVE_USER_PROFILE, UPDATE_USER_PROFILE, RESET_USER_PROFILE, initialUserProfile );
export const saveUserProfileAction = createAVFormSaveAction( SAVE_USER_PROFILE, validation );
export const updateUserProfileAction = createAVFormUpdateAction( UPDATE_USER_PROFILE, validation );
export const resetUserProfileAction = createAVFormResetAction( RESET_USER_PROFILE );