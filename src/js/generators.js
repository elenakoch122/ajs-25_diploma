/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  // let player = new Map();
  // let computer = new Map();

  // if (/*уровень 1*/) {
  let filteredAllowedTypes = allowedTypes.filter((item) => item.level <= maxLevel);
  yield filteredAllowedTypes[Math.floor(Math.random() * filteredAllowedTypes.length)];

  
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
}
