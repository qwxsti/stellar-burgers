import { rootReducer, store } from '../store';

test('Correct rootReducer init', () => {
  const rootResult = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  expect(rootResult).toEqual(store.getState());
});
