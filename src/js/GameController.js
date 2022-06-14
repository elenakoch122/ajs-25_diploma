import themes from './themes';
import cursors from './cursors';
import GameState from './GameState';
import GamePlay from './GamePlay';
import { generateTeam, genPosLeft, genPosRight } from './generators';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    const positions = [];
    const allowedTypes = [Bowman, Daemon, Magician, Swordsman, Undead, Vampire];
    const maxLevel = 1;
    const characterCount = 2;
    const characters = generateTeam(allowedTypes, maxLevel, characterCount);
    const posLeft = genPosLeft(characterCount);
    const posRight = genPosRight(characterCount);
    characters.player.forEach((item) => {
      positions.push(new PositionedCharacter(item, posLeft.next().value));
      console.log(positions);
    });
    characters.computer.forEach((item) => {
      positions.push(new PositionedCharacter(item, posRight.next().value));
    });
    this.gamePlay.redrawPositions(positions);

    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  onCellClick(index) {
    // TODO: react to click
    if (this.gamePlay.cells[index].querySelector('.character')/* есть персонаж на клетке, и он играбельный */) {
      this.gamePlay.selectCell(index, color = 'yellow');
    } else {
      GamePlay.showError('В клетке нет игрока!');
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    // const character = this.gamePlay.cells[index].querySelector('.character')
    // boardEl.children[index].querySelector('.character')
    if (this.gamePlay.cells[index].querySelector('.character')/* есть персонаж на клетке */) {
      this.gamePlay.setCursor(cursors.pointer);
      const levelIcon = String.fromCodePoint(0x1F396);
      const attackIcon = String.fromCodePoint(0x2694);
      const defenceIcon = String.fromCodePoint(0x1F6E1);
      const healthIcon = String.fromCodePoint(0x2764);
      const message = `${levelIcon}1 ${attackIcon}1 ${defenceIcon}1 ${healthIcon}1`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
