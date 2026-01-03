import { getFeedsApi, getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface feedState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialState: feedState = {
  orders: [],
  isLoading: true,
  error: null,
  total: 0,
  totalToday: 0
};

export const getFeed = createAsyncThunk(
  'api/orders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        'Произошла ошибка при загрузке заказов:' /*+ error*/
      );
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state: feedState) => {
        state.orders = [];
        state.isLoading = true;
        state.error = null;
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.error = null;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orders = [];
        state.error =
          (action.payload as string) || 'Произошла ошибка при загрузке заказов';
        state.isLoading = false;
        state.total = 0;
        state.totalToday = 0;
      });
  }
});

export const feedReducer = feedSlice.reducer;
