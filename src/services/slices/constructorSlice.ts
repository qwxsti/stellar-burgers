import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface constructorState {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
}

const initialState: constructorState = {
    bun: null,
    ingredients: []
}

const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action) => {
                if (action.payload.type === 'bun') state.bun = action.payload;
                else state.ingredients.push(action.payload);
            },
            prepare: (ingredient: TIngredient) => {
                const id = nanoid();
                return { 
                    payload: { id, ...ingredient },
                    meta: undefined,
                    error: undefined
                };
            }
        },
        removeIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(item => item.id !== action.payload);
        },
    }
})

export const { addIngredient, removeIngredient } = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
