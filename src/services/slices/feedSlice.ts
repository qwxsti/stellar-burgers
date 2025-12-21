import { getFeedsApi, getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface feedState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: feedState = {
  orders: [],
  isLoading: true,
  error: null
};

export const getFeed = createAsyncThunk(
  'api/orders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data;
    } catch (error) {
      return rejectWithValue('Произошла ошибка при загрузке заказов:' + error);
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
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.orders = [];
        state.error =
          (action.payload as string) || 'Произошла ошибка при загрузке заказов';
        state.isLoading = false;
      });
  }
});

export const feedReducer = feedSlice.reducer;
