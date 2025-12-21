import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  TRegisterData,
  TLoginData,
  getOrdersApi
} from '@api';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface userState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  error: string | null;
  orders: TOrder[];
}

const initialState: userState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  orders: []
};

export const registerUser = createAsyncThunk(
  'api/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);

      if (!response.success) {
        return rejectWithValue(
          'Произошла ошибка при регистрации пользователя: ' + response
        );
      }

      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при регистрации пользователя: ' + error
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'api/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);

      if (!response.success) {
        return rejectWithValue(
          'Произошла ошибка при входе пользователя: ' + response
        );
      }

      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      return response;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при входе пользователя: ' + error
      );
    }
  }
);

export const getUser = createAsyncThunk(
  'api/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при получении данных пользователя: ' + error
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'api/updateUser',
  async (data: Partial<TUser>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(data);
      return response;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при обновлении данных пользователя: ' + error
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'api/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при выходе пользователя: ' + error
      );
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'api/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при получении заказов пользователя: ' + error
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при регистрации пользователя';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при входе пользователя';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при получении данных пользователя';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при обновлении данных пользователя';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при выходе пользователя';
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при получении заказов пользователя';
      });
  }
});

export const userReducer = userSlice.reducer;
