import PositionedCharacter from './PositionedCharacter';
import GameController from './GameController';
import GamePlay from './GamePlay';

function generatePosition(arr) {
  return Math.floor(Math.random() * arr.length);
}

// function checkPosition(arr, position) {
//   if (arr.length > 0 && arr.some((item) => item.position === position)) {
//     i -= 1;
//     break;
//   }
// }

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
  yield filteredAllowedTypes[generatePosition(filteredAllowedTypes)];
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const player = [];
  const computer = [];
  // const arrPlayerPos = [];
  // const arrCompPos = [];

  // // Персонажи генерируются рандомно в столбцах 1 и 2 для игрока и в столбцах 7 и 8 для компьютера
  // for (let i = 0; i < 8 ** 2; i += 1) {
  //   if (i === 0 || i === 1 || i % 8 === 0 || i % 8 === 1) {
  //     arrPlayerPos.push(i);
  //   }
  //   if (i === 8 - 2 || i === 8 - 1 || (i + 2) % 8 === 0 || (i + 1) % 8 === 0) {
  //     arrCompPos.push(i);
  //   }
  // }

  // уровень 1 (по 2 игрока)
  if (characterCount === 2) {
    const typesForPlayer = allowedTypes.filter((item) => item.type === 'bowman' || item.type === 'swordsman');

    for (let i = 1; i <= characterCount; i += 1) {
      player.push(characterGenerator(typesForPlayer, 1).next().value);
      computer.push(characterGenerator(allowedTypes, maxLevel).next().value);
    }

    // const typesForPlayer = allowedTypes.filter((item) => item.type === 'bowman' || item.type === 'swordsman');

    // // запускаем цикл с 1, определяем позицию - если уже есть объект с такой позицией,
    // // то уменьшаем i на 1, чтобы на след. итерации i повторилась, пока не определится
    // // позиция, отличная от существующих
    // for (let i = 1; i <= characterCount; i += 1) {
    //   const playerPosition = arrPlayerPos[generatePosition(arrPlayerPos)];
    //   if (player.length > 0 && player.some((item) => item.position === playerPosition)) {
    //     i -= 1;
    //     break;
    //   }
    //   const playerCharacter = characterGenerator(typesForPlayer, 1).next().value;
    //   player.push(new PositionedCharacter(playerCharacter, playerPosition));
    // }

    // for (let i = 1; i <= characterCount; i += 1) {
    //   const compPosition = arrCompPos[generatePosition(arrCompPos)];
    //   if (computer.length > 0 && computer.some((item) => item.position === compPosition)) {
    //     i -= 1;
    //     break;
    //   }
    //   const compCharacter = characterGenerator(allowedTypes, maxLevel).next().value;
    //   computer.push(new PositionedCharacter(compCharacter, compPosition));
    // }
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
