export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 50;
    this.type = type;
    // TODO: throw error if user use "new Character()"
    if (new.target.name === 'Character') {
      throw new Error('Нельзя создавать объекты через new Character()');
    }
  }

  levelUp() {
    this.level += 1;
    this.health += 80;
    if (this.health > 100) {
      this.health = 100;
    }
    // attackAfter = Math.max(attackBefore, attackBefore * (1.8 - life) / 100) прописать код
  }
}
