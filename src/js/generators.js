/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const filteredAllowedTypes = allowedTypes.filter((item) => item.level <= maxLevel);
  yield filteredAllowedTypes[Math.floor(Math.random() * filteredAllowedTypes.length)];
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  // let player = new Map();
  // let computer = new Map();
  const player = [];
  const computer = [];

  // уровень 1
  if (characterCount === 2) {
    const filteredAllowedTypesForPlayer = allowedTypes.filter((item) => item.type === 'bowman' || item.type === 'swordsman');
    // player.set('char1', characterGenerator(filteredAllowedTypesForPlayer, 1).next().value);
    // player.set('char2', characterGenerator(filteredAllowedTypesForPlayer, 1).next().value);
    // computer.set('char1', characterGenerator(allowedTypes, maxLevel).next().value);
    // computer.set('char2', characterGenerator(allowedTypes, maxLevel).next().value);

    for (let i = 1; i <= characterCount; i += 1) {
      player.push(characterGenerator(filteredAllowedTypesForPlayer, 1).next().value);
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 2
  if (characterCount === 3) {
    player.push(characterGenerator(allowedTypes, maxLevel - 1).next().value);
    for (let i = 1; i <= characterCount; i += 1) {
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 3
  if (characterCount === 5) {
    for (let i = 1; i <= 2; i += 1) {
      player.push(characterGenerator(allowedTypes, maxLevel - 1).next().value);
    }
    for (let i = 1; i <= characterCount; i += 1) {
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }
  }

  // уровень 4
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
