import Character from '../Character';
import Bowman from '../Bowman';

test('preventing the creation of Character objects', () => {
  expect(() => new Character(1, 'bowman')).toThrow(new Error('Нельзя создавать объекты через new Character()'));
});

test('create an instance of the inherited class, for example Bowman', () => {
  expect(new Bowman(1)).toBeInstanceOf(Bowman);
});
