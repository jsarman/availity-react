import { enableTooltipsAction } from '../models/UISettings';
import { saveUserProfileAction, updateUserProfileAction, resetUserProfileAction } from '../models/UserProfile';

export const updateUserProfile = updateUserProfileAction;

export const saveUserProfile = saveUserProfileAction;

export const enableTooltips = enableTooltipsAction;

export const resetUserProfile = resetUserProfileAction;