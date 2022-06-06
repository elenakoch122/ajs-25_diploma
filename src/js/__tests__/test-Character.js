import Character from '../Character';

test('preventing the creation of Character objects', () => {
  expect(() => new Character(1, 'bowman')).toThrow(new Error('Нельзя создавать объекты через new Character()'));
});
