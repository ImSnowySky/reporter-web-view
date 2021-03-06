import * as api from '../api';
import { bindActionCreators } from 'redux';
import { createAsyncAction } from '../../../utils/async-action-creator';
import { actionTypes } from './constants';
import { createAction } from 'redux-actions';
import getText from '../../shared/Text';

const text = getText('AUTH');

const saveTokenToCookieAndGo = token => {
  document.cookie = `auth-token=${token}; max-age=86400`;
  window.location.href = '/main';
}

export const changeInputValue = createAction(actionTypes.CHANGE_INPUTS_VALUE, payload => {
  const { login, password } = payload;
  payload.buttonEnabled = !(login === '' || password === '');
  return payload;
});

export const loginAction = createAsyncAction(actionTypes.LOGIN);
export const sendLoginRequest = (login, password) => async dispatch => {
  const action = bindActionCreators(loginAction, dispatch);
  action.started();

  try {
    const res = await api.login(login, password);
    if (res.status === 'OK') {
      saveTokenToCookieAndGo(res.response);
      action.success();
    } else {
      action.failure({ error: text(res.response) || res.response })
    }
  } catch (e) {
    action.failure({ error: text(e.message) || e.message });
  }
}

export const registerAction = createAsyncAction(actionTypes.REGISTER);
export const sendRegisterRequest = (login, password) => async dispatch => {
  const action = bindActionCreators(registerAction, dispatch);
  action.started();

  try {
    const res = await api.register(login, password);
    if (res.status === 'OK') {
      saveTokenToCookieAndGo(res.response);
      action.success();
    } else {
      action.failure({ error: text(res.response) || res.response })
    }
  } catch (e) {
    action.failure({ error: text(e.message) || e.message });
  }
}