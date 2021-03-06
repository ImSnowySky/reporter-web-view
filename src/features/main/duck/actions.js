import * as errorAPI from '../../errors/api';
import * as userAPI from '../../users/api';
import * as storiesAPI from '../../stories/api';
import { bindActionCreators } from 'redux';
import { createAsyncAction } from '../../../utils/async-action-creator';
import { actionTypes } from './constants';
import dayjs from 'dayjs';

export const getErrorInfoAction = createAsyncAction(actionTypes.GET_ERRORS);
export const getErrorInfo = () => async dispatch => {
  const action = bindActionCreators(getErrorInfoAction, dispatch);
  action.started();

  try {
    const currentDate = dayjs();
    const [lastErrors, lastErrorsCount, allErrorsCount] = await Promise.all([
      errorAPI.getErrors(),
      errorAPI.getErrorsCount({ from: currentDate.add(-7, 'day').format(), to: currentDate.format() }),
      errorAPI.getErrorsCount({ })
    ]);

    const result = { list: lastErrors.response, lastWeekCount: lastErrorsCount.response, allTimeCount: allErrorsCount.response };
    action.success(result);
    return result;
  } catch (e) {
    action.failure({ error: e.message });
    return false;
  }
};

export const getUsersInfoAction = createAsyncAction(actionTypes.GET_USERS);
export const getUsersInfo = () => async dispatch => {
  const action = bindActionCreators(getUsersInfoAction, dispatch);
  action.started();

  try {
    const currentDate = dayjs();
    const [users, lastUsersCount, allUsersWithErrorCount, allUsersCount] = await Promise.all([
      userAPI.getUsers(),
      userAPI.getUsersCount({ from: currentDate.add(-7, 'day').format(), to: currentDate.format() }),
      userAPI.getUsersCount({ onlyWithError: true }),
      userAPI.getUsersCount(),
    ]);

    const result = { list: users.response, lastUsersCount: lastUsersCount.response, allUsersCount: allUsersCount.response, allUsersWithErrorCount: allUsersWithErrorCount.response };
    action.success(result);
    return result;
  } catch (e) {
    action.failure({ error: e.message });
    return false;
  }
};

export const getStoriesInfoAction = createAsyncAction(actionTypes.GET_STORIES);
export const getStoriesInfo = () => async dispatch => {
  const action = bindActionCreators(getStoriesInfoAction, dispatch);
  action.started();

  try {
    const stories = await storiesAPI.getStories({ limit: 2 });
    action.success({ stories: stories.response });
    return stories;
  } catch (e) {
    action.failure({ error: e.message });
    return false;
  }
}