import {
  userReducer,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  getUserOrders,
  forgotPassword,
  resetPassword,
  userState
} from '../slices/userSlice';
import { TUser, TOrder } from '@utils-types';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Nikita'
};

const mockOrders: TOrder[] = [
  {
    _id: '23',
    status: 'DONE',
    name: 'giga burger',
    createdAt: '03.01.2026',
    updatedAt: '03.01.2026',
    number: 3,
    ingredients: ['9yh80w4erhu9sdf', 'ioshbdfuw9e8hur']
  }
];

const initialState: userState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: null,
  orders: []
};

describe('User Slice (register)', () => {
  test('write data when fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userReducer(initialState, action);

    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(mockUser);
    expect(newState.error).toBeNull();
  });

  test('show error when rejected', () => {
    const errorText = 'Произошла ошибка при регистрации пользователя';
    const action = {
      type: registerUser.rejected.type,
      payload: errorText
    };
    const newState = userReducer(initialState, action);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.user).toBeNull();
    expect(newState.error).toBe(errorText);
  });
});

describe('User Slice (login)', () => {
  test('success login', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userReducer(initialState, action);

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(mockUser);
  });

  test('error while logging in', () => {
    const errorText = 'Произошла ошибка при входе пользователя: ';
    const action = {
      type: loginUser.rejected.type,
      payload: errorText
    };
    const newState = userReducer(initialState, action);

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe(errorText);
  });
});

describe('User Slice (getUser)', () => {
  test('user auth check success (fulfilled)', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const newState = userReducer(initialState, action);

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toEqual(mockUser);
  });

  test('user auth check failed (rejected)', () => {
    const errorText = 'Произошла ошибка при получении данных пользователя: ';
    const action = { type: getUser.rejected.type, payload: errorText };
    const newState = userReducer(initialState, action);

    expect(newState.error).toBe(errorText);
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.isAuthChecked).toBe(true);
    expect(newState.user).toBeNull();
  });
});

describe('User Slice (logout)', () => {
  test('logout success', () => {
    const loggedState = {
      ...initialState,
      isAuthenticated: true,
      user: mockUser
    };

    const action = { type: logoutUser.fulfilled.type };
    const newState = userReducer(loggedState, action);

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.user).toBeNull();
  });

  test('error while logout', () => {
    const loggedState = {
      ...initialState,
      isAuthenticated: true,
      user: mockUser
    };

    const errorText = 'Произошла ошибка при выходе пользователя';

    const action = { type: logoutUser.rejected.type, payload: errorText };
    const newState = userReducer(loggedState, action);

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.user).toEqual(mockUser);
    expect(newState.error).toBe(errorText);
  });
});

describe('User Slice (getUserOrders)', () => {
  test('get orders success', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockOrders
    };
    const newState = userReducer(initialState, action);

    expect(newState.orders).toEqual(mockOrders);
    expect(newState.error).toBeNull();
  });

  test('get orders failed', () => {
    const errorText = 'Произошла ошибка при получении заказов пользователя: ';
    const action = { type: getUserOrders.rejected.type, payload: errorText };
    const newState = userReducer(initialState, action);

    expect(newState.error).toBe(errorText);
  });
});

describe('User Slice (forgotPassword)', () => {
  test('pending', () => {
    const stateWithError = { ...initialState, error: 'Old Error' };
    const action = { type: forgotPassword.pending.type };
    const newState = userReducer(stateWithError, action);

    expect(newState.error).toBeNull();
  });

  test('fulfilled', () => {
    const stateWithError = { ...initialState, error: 'Old Error' };
    const action = { type: forgotPassword.fulfilled.type };
    const newState = userReducer(stateWithError, action);

    expect(newState.error).toBeNull();
  });

  test('rejected', () => {
    const errorText = 'Произошла ошибка при сбросе пароля';
    const action = { type: forgotPassword.rejected.type, payload: errorText };
    const newState = userReducer(initialState, action);

    expect(newState.error).toBe(errorText);
  });
});

describe('User Slice (resetPassword)', () => {
  test('pending', () => {
    const stateWithError = { ...initialState, error: 'Old Error' };
    const action = { type: resetPassword.pending.type };
    const newState = userReducer(stateWithError, action);

    expect(newState.error).toBeNull();
  });

  test('fulfilled', () => {
    const stateWithError = { ...initialState, error: 'Old Error' };
    const action = { type: resetPassword.fulfilled.type };
    const newState = userReducer(stateWithError, action);

    expect(newState.error).toBeNull();
  });

  test('rejected', () => {
    const errorText = 'Произошла ошибка при сбросе пароля';
    const action = { type: resetPassword.rejected.type, payload: errorText };
    const newState = userReducer(initialState, action);

    expect(newState.error).toBe(errorText);
  });
});
