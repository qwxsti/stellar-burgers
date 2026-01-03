import {
  ingredientsReducer,
  getIngredients,
  initialState
} from '../slices/ingredientsSlice';

const mockIngredients = [
  {
    id: '2',
    _id: '22',
    name: 'giga-sause',
    type: 'sauce',
    proteins: 21,
    fat: 42,
    carbohydrates: 52,
    calories: 121,
    price: 212,
    image: 'img-link',
    image_large: 'img-link',
    image_mobile: 'img-link'
  },
  {
    id: '3',
    _id: '21',
    name: 'giga-meat',
    type: 'main',
    proteins: 21,
    fat: 42,
    carbohydrates: 52,
    calories: 121,
    price: 212,
    image: 'img-link',
    image_large: 'img-link',
    image_mobile: 'img-link'
  },
  {
    id: '1',
    _id: '23',
    name: 'mayo',
    type: 'sauce',
    proteins: 21,
    fat: 42,
    carbohydrates: 52,
    calories: 121,
    price: 212,
    image: 'img-link',
    image_large: 'img-link',
    image_mobile: 'img-link'
  }
];

describe('Ingredients Slice', () => {
  test('Changing status to loading while pending', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
  });

  test('Write data when fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.error).toBeNull();
    expect(newState.ingredients).toEqual(mockIngredients);
    expect(newState.isLoading).toBe(false);
  });

  test('Show error when rejected', () => {
    const errorText = 'Произошла ошибка при загрузке ингредиентов:';
    const action = { type: getIngredients.rejected.type, payload: errorText };

    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorText);
  });
});
