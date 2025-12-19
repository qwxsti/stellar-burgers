import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface ingredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ingredientsState = {
  ingredients: [],
  isLoading: true,
  error: null
};

export const getIngredients = createAsyncThunk(
  'api/ingredients',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Начинаем загрузку ингредиентов...');
      const data = await getIngredientsApi();
      console.log('Данные загружены:', data);
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке:', error);
      return rejectWithValue('Произошла ошибка при загрузке ингредиентов');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state: ingredientsState) => {
        state.ingredients = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        console.log('Fulfilled data:', action.payload);
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        console.log('Error:', action.payload);
        state.ingredients = [];
        state.error = action.payload as string;
        state.isLoading = false;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
