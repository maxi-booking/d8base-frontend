import { UserSettings } from '@app/api/models';
import { AuthResponseInterface } from '@app/auth/interfaces/auth-response.interface';
import { CurrentUserStateModel } from './current-user-state.model';

export const defaultState: CurrentUserStateModel = {
  profile: null,
  tokens: null,
  professionals: null,
  settings: null,
  errors: null,
};

export const emptyTokens: AuthResponseInterface = {
  access_token: null,
  expires_in: 0,
  token_type: null,
  scope: null,
  refresh_token: null,
};

export const defaultSettings: UserSettings = {
  units: 0,
  currency: 'CAD',
  language: 'en',
  is_last_name_hidden: false,
};

export const guestState: CurrentUserStateModel = {
  profile: null,
  tokens: emptyTokens,
  professionals: [],
  settings: defaultSettings,
  errors: [],
};
