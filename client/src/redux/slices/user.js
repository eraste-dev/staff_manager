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
  registerSuccess: false,
  updateSuccess: false,
  token: null,
  user: {},
  expire: null,
  notifications: undefined,
  userRequest: {
    isLoading: false,
    error: null,
    success: false,
    successMessage: null,
    requests: [],
  },
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
     * Sets the isLoading property of the userRequest state object to true.
     *
     * @param {Object} state - The state object.
     * @return {void}
     */
    startUserRequestLoading(state) {
      state.userRequest.successMessage = null;
      state.userRequest.isLoading = true;
    },

    /**
     * Updates the state when an error occurs.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the payload data.
     */
    hasError(state, action) {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload?.error;
      state.success = false;
      state.registerSuccess = false;
      state.updateSuccess = false;
      // state.expire = null;
      // state.token = null;
      // state.user = null;
    },

    /**
     * Updates the state when an error occurs in the user request.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the payload data.
     */
    hasErrorUserRequest(state, action) {
      state.userRequest.isLoading = false;
      state.userRequest.error = action.payload?.error;
      state.userRequest.success = false;
      state.userRequest.successMessage = null;
    },

    /**
     * Initializes the user request state object with default values.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the payload data.
     */
    initializeUserRequest(state, action) {
      state.userRequest = {
        error: null,
        isLoading: false,
        success: false,
        successMessage: null,
        requests: [],
      };
    },

    /**
     * Updates the user login success state based on the action payload.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.success = true;
      state.registerSuccess = false;
      state.updateSuccess = false;
      state.expire = action.payload.data.expire;
      state.error = null;
      // Sauvegarder le token dans le cache
      localStorage.setItem('authToken', action.payload.data.token);
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
      state.success = null;
      state.registerSuccess = null;
      state.updateSuccess = null;
      state.error = null;
      state.isLoading = false;
    },

    /**
     * Updates the user registration success state based on the action payload.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    registerSuccess(state, action) {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;
      state.expire = action.payload.data.expire;
      state.isLoading = false;
      state.success = false;
      state.updateSuccess = false;
      state.registerSuccess = true;
      state.error = null;
    },

    /**
     * Updates the account success state based on the action payload.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    updateAccountSuccess(state, action) {
      state.user = action.payload.data;
      state.isLoading = false;
      state.updateSuccess = true;
      state.error = null;
    },

    /**
     * Updates the account success state based on the action payload.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    getNotificationSuccess(state, action) {
      state.notifications = action.payload.data;
      state.isLoading = false;
      state.error = null;
    },

    /**
     * Updates the state with the success of getting user requests.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     * @return {void}
     */
    getUserRequestSuccess(state, action) {
      state.userRequest.isLoading = false;
      state.userRequest.success = true;
      state.userRequest.successMessage = action.payload.message;
      state.userRequest.requests = action.payload.data;
    },

    /**
     * Updates the state with the success of storing a user request.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing payload data.
     */
    storeUserRequestSuccess(state, action) {
      state.userRequest.isLoading = false;
      state.userRequest.success = true;
      // state.userRequest.requests.push(action.payload.data);
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

/**
 * Sends a POST request to the '/auth/register' endpoint to register a new user.
 *
 * @param {Object} payload - The data to be sent in the request body. It should contain the following properties:
 *   - nomemp: The name of the user.
 *   - premp: The prefix of the user's email.
 *   - matemp: The user's email.
 *   - foncemp: The user's phone number.
 *   - email: The user's email.
 *   - password: The user's password.
 * @return {Promise<void>} A promise that resolves when the request is successful, or rejects with an error.
 */
export function register(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/auth/register', payload);
      dispatch(slice.actions.registerSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/**
 * Updates the user's account information.
 *
 * @param {Object} payload - The payload containing the updated account information.
 * @return {Promise<void>} A Promise that resolves when the account information is successfully updated.
 */
export function updateAccount(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/user/update-profile', payload);
      dispatch(slice.actions.updateAccountSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/**
 * Retrieves notifications for the user.
 *
 * @param {Object} payload - The payload for fetching notifications.
 * @return {Promise<void>} A Promise that resolves when notifications are successfully fetched.
 */
export function getNotifications(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/user/notifications', payload);
      dispatch(slice.actions.getNotificationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/**
 * Retrieves user requests by sending a GET request to '/user/requests'.
 *
 * @return {Promise<void>} A Promise that resolves when user requests are successfully fetched.
 */
export function getUserRequests() {
  return async () => {
    dispatch(slice.actions.startUserRequestLoading());
    try {
      const response = await axios.get('/user/requests');
      dispatch(slice.actions.getUserRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasErrorUserRequest(error));
    }
  };
}

/**
 * Saves a user request by sending a POST request to '/user/requests' endpoint.
 *
 * @param {Object} payload - The payload containing the user request data.
 * @return {Promise<void>} A Promise that resolves when the user request is successfully saved,
 * or rejects with an error if the request fails.
 */
export function saveUserRequest(payload) {
  return async () => {
    dispatch(slice.actions.startUserRequestLoading());
    try {
      const response = await axios.post('/user/requests', payload);
      dispatch(slice.actions.storeUserRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasErrorUserRequest(error));
    }
  };
}

/**
 * Initiates the user request process.
 *
 * @return {Promise<void>} A Promise that resolves when the user request initialization is successful.
 */
export function initUserRequest() {
  return async () => {
    dispatch(slice.actions.initializeUserRequest());
  };
}
