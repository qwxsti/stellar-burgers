import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderByNumber: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  orderByNumber: null,
  error: null
};

export const placeOrder = createAsyncThunk(
  'api/order',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    console.log(response);
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'api/orderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при загрузке заказа по номеру: ' /*+ error*/
      );
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
      state.error = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error =
          (action.payload as string) ||
          'Произошла ошибка при оформлении заказа';
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload[0];
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error =
          (action.payload as string) || 'Произошла ошибка при загрузке заказа';
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
