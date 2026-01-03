import {
  orderReducer,
  placeOrder,
  getOrderByNumber,
  OrderState,
  initialState
} from '../slices/orderSlice';

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

const mockOrder = {
  _id: '23',
  status: 'DONE',
  name: 'giga burger',
  createdAt: '03.01.2026',
  updatedAt: '03.01.2026',
  number: 3,
  ingredients: ['9yh80w4erhu9sdf', 'ioshbdfuw9e8hur']
};

const mockPayload = { orders: [mockOrder] };

describe('Order Slice (getting order by number)', () => {
  test('Changing status to loading while pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const newState = orderReducer(initialState, action);

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.orderByNumber).toBeNull();
    expect(newState.orderModalData).toBeNull();
  });

  test('Write data when fulfilled', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: [mockOrder]
    };
    const newState = orderReducer(initialState, action);

    expect(newState.error).toBeNull();
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderByNumber).toEqual(mockOrder);
  });

  test('Show error when rejected', () => {
    const errorText = 'Произошла ошибка при загрузке заказа по номеру: ';
    const action = { type: getOrderByNumber.rejected.type, payload: errorText };

    const newState = orderReducer(initialState, action);

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe(errorText);
  });
});

describe('Order Slice (placing order)', () => {
  const initialState: OrderState = {
    orderRequest: false,
    orderModalData: null,
    orderByNumber: null,
    error: null
  };

  test('Changing status to loading while pending', () => {
    const action = { type: placeOrder.pending.type };
    const newState = orderReducer(initialState, action);

    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeNull();
    expect(newState.orderByNumber).toBeNull();
    expect(newState.orderModalData).toBeNull();
  });

  test('Write data when fulfilled', () => {
    const action = { type: placeOrder.fulfilled.type, payload: mockOrder };
    const newState = orderReducer(initialState, action);

    expect(newState.error).toBeNull();
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  test('Show error when rejected', () => {
    const errorText = 'Произошла ошибка при оформлении заказа';
    const action = { type: placeOrder.rejected.type, payload: errorText };

    const newState = orderReducer(initialState, action);

    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe(errorText);
  });
});
