/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const idx = Math.floor(Math.random() * allowedTypes.length);
  const level = Math.floor(Math.random() * maxLevel + 1);
  yield new allowedTypes[idx](level);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const player = [];
  const computer = [];

  // уровень 1 (по 2 игрока)
  if (characterCount === 2) {
    const typesForPlayer = allowedTypes.filter((item) => item.name === 'Bowman' || item.name === 'Swordsman');

    for (let i = 1; i <= characterCount; i += 1) {
      player.push(characterGenerator(typesForPlayer, 1).next().value);
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 2 (по 3 игрока)
  if (characterCount === 3) {
    player.push(characterGenerator(allowedTypes, maxLevel - 1).next().value);
    for (let i = 1; i <= characterCount; i += 1) {
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 3 (по 5 игроков)
  if (characterCount === 5) {
    for (let i = 1; i <= 2; i += 1) {
      player.push(characterGenerator(allowedTypes, maxLevel - 1).next().value);
    }
    for (let i = 1; i <= characterCount; i += 1) {
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 4 (по 7 игроков)
  if (characterCount === 7) {
    for (let i = 1; i <= 2; i += 1) {
      player.push(characterGenerator(allowedTypes, maxLevel - 1).next().value);
    }
    for (let i = 1; i <= characterCount; i += 1) {
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }
  return { player, computer };
}
