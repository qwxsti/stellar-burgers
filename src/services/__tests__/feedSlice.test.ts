import { feedReducer, getFeed, initialState } from '../slices/feedSlice';

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

const mockOrders = [
  {
    _id: '23',
    status: 'DONE',
    name: 'giga burger',
    createdAt: '03.01.2026',
    updatedAt: '03.01.2026',
    number: 3,
    ingredients: ['9yh80w4erhu9sdf', 'ioshbdfuw9e8hur']
  },
  {
    _id: '24',
    status: 'DONE',
    name: 'giga niga burger',
    createdAt: '03.01.2026',
    updatedAt: '03.01.2026',
    number: 3,
    ingredients: ['9yh80w4erhu9sdf', 'ioshbdfuw9e8hur']
  }
];

const mockPayload = {
  orders: mockOrders,
  total: 732,
  totalToday: 52,
  success: true
};

describe('Feed Slice', () => {
  test('Changing status to loading while pending', () => {
    const action = { type: getFeed.pending.type };
    const newState = feedReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });

  test('Write data when fulfilled', () => {
    const action = { type: getFeed.fulfilled.type, payload: mockPayload };
    const newState = feedReducer(initialState, action);

    expect(newState.error).toBeNull();
    expect(newState.orders).toEqual(mockOrders);
    expect(newState.total).toEqual(732);
    expect(newState.totalToday).toEqual(52);
    expect(newState.isLoading).toBe(false);
  });

  test('Show error when rejected', () => {
    const errorText = 'Произошла ошибка при загрузке заказов:';
    const action = { type: getFeed.rejected.type, payload: errorText };

    const newState = feedReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toBe(errorText);
    expect(newState.total).toEqual(0);
    expect(newState.totalToday).toEqual(0);
  });
});
