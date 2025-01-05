// src/features/auth/AuthActions.js
import axios from 'axios';
import { loginSuccess, logout } from './authSlice';

export const login = (userCredentials) => async (dispatch) => {
  try {
    // Simulate API call to authenticate the user
    const response = await axios.post('auth/login', {
      email: userCredentials.email,
      password: userCredentials.password,
    });

    const { data } = response;


    // Save token to localStorage (or secure storage mechanism)
    localStorage.setItem('isLogged', 'true');
    localStorage.setItem('token', data.token);

    axios.defaults.headers["Authorization"] = "Bearer " + data.token;
    // Dispatch the loginSuccess action with user data
    dispatch(loginSuccess({ user: data.user, token: data.token }));
  } catch (error) {
    console.error('Login failed:', error);
    // Optionally, dispatch an error action or handle it in the component
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('isLogged');
  localStorage.removeItem('token');
  dispatch(logout());
};
