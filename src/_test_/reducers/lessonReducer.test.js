import lessons from './../../store/reducers/lessonReducer';

describe('lessons', () => {
  test('Should return default state if no action type is recognized', () => {
    expect(lessons(false, { type: null })).toEqual(false);
  });
});
