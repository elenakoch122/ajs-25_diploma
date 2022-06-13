import Character from '../Character';
import Bowman from '../characters/Bowman';

test('preventing the creation of Character objects', () => {
  expect(() => new Character(1, 'bowman')).toThrow(new Error('Нельзя создавать объекты через new Character()'));
});

test('create an instance of the inherited class, for example Bowman', () => {
  expect(new Bowman(1)).toBeInstanceOf(Bowman);
});

test('levelUp method, should raise level by 1', () => {
  const char = new Bowman(1);
  char.levelUp();
  expect(char.level).toBe(2);
});

test('levelUp method, health is increased by 80', () => {
  const char = new Bowman(1);
  char.health = 15;
  char.levelUp();
  expect(char.health).toBe(95);
});

test('levelUp method, health cannot be more than 100', () => {
  const char = new Bowman(1);
  char.health = 30;
  char.levelUp();
  expect(char.health).toBe(100);
});

test('levelUp method, calculates the attack', () => {
  const char = new Bowman(1);
  char.health = 30;
  char.levelUp();
  expect(char.attack).toBe(27);
});

test('levelUp method, calculates the defence', () => {
  const char = new Bowman(1);
  char.health = 10;
  char.levelUp();
  expect(char.attack).toBe(25);
});
