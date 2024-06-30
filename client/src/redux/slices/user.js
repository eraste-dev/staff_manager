import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import axios from '../../utils/axios';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  success: false,
  token: null,
  user: {},
  expire: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Sets the isLoading property of the state object to true.
     *
     * @param {Object} state - The state object.
     * @return {void}
     */
    startLoading(state) {
      state.isLoading = true;
    },

    /**
     * Updates the state when an error occurs.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the payload data.
     */
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.expire = null;
      state.token = null;
      state.user = null;
    },

    /**
     * Updates the user login success state based on the action payload.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    loginSuccess(state, action) {
      console.log(action, 'loginSuccess in user slice');
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.success = action.payload.data.success;
      state.expire = action.payload.data.expire;
    },

    /**
     * Resets the user state by setting the user, token, expire, and success properties to null or false.
     *
     * @param {Object} state - The current state of the user slice.
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.expire = null;
      state.success = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { logout } = slice.actions;

// ----------------------------------------------------------------------

/**
 * Initiates the login process by sending a request to the server to authenticate the user.
 *
 * @param {type} matemp - Description of the parameter matemp
 * @param {type} password - Description of the parameter password
 * @return {type} Description of the return value
 */
export function login(matemp, password) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/auth/login', { matemp, password });
      dispatch(slice.actions.loginSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
