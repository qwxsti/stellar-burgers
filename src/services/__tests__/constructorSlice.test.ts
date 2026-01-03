import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredient,
  constructorState
} from '../slices/constructorSlice';

const mockBun = {
  _id: '1',
  name: 'giga-bun',
  type: 'bun',
  proteins: 21,
  fat: 42,
  carbohydrates: 52,
  calories: 121,
  price: 212,
  image: 'img-link',
  image_large: 'img-link',
  image_mobile: 'img-link'
};

const mockIngredient = {
  _id: '2',
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
};

const initialState: constructorState = {
  bun: null,
  ingredients: []
};

const toDeleteState: constructorState = {
  bun: null,
  ingredients: [
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
    }
  ]
};

const toMoveState: constructorState = {
  bun: null,
  ingredients: [
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
  ]
};

test('Add bun', () => {
  const newState = constructorReducer(initialState, addIngredient(mockBun));

  expect(newState.bun).toEqual(expect.objectContaining(mockBun));
  expect(newState.ingredients).toHaveLength(0);
});

test('add ingredient', () => {
  const newState = constructorReducer(
    initialState,
    addIngredient(mockIngredient)
  );

  expect(newState.bun).toBeNull();
  expect(newState.ingredients).toHaveLength(1);
  expect(newState.ingredients[0]).toEqual(
    expect.objectContaining(mockIngredient)
  );
});

test('remove ingredients', () => {
  const newState = constructorReducer(toDeleteState, removeIngredient('2'));

  expect(newState.ingredients).toHaveLength(0);
});

test('move ingredient', () => {
  const newState = constructorReducer(
    toMoveState,
    moveIngredient({ from: 0, to: 1 })
  );

  expect(toMoveState.ingredients[0]).toEqual(newState.ingredients[1]);
});
