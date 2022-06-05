import { calcTileType } from '../utils';

test.each([
  [0, 'top-left'],
  [7, 'top-right'],
  [2, 'top'],
  [56, 'bottom-left'],
  [63, 'bottom-right'],
  [60, 'bottom'],
  [8, 'left'],
  [15, 'right'],
  [9, 'center'],
])('utils function, field boundaries should be wavy', (idx, square) => {
  expect(calcTileType(idx, 8)).toBe(square);
});
