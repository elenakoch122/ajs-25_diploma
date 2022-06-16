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
    this.positions = [];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    // const positions = [];
    const allowedTypes = [Bowman, Daemon, Magician, Swordsman, Undead, Vampire];
    const maxLevel = 1;
    const characterCount = 2;
    const characters = generateTeam(allowedTypes, maxLevel, characterCount);
    const posLeft = genPosLeft(characterCount);
    const posRight = genPosRight(characterCount);
    characters.player.forEach((item) => {
      this.positions.push(new PositionedCharacter(item, posLeft.next().value));
    });
    characters.computer.forEach((item) => {
      this.positions.push(new PositionedCharacter(item, posRight.next().value));
    });
    this.gamePlay.redrawPositions(this.positions);

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
  }

  onCellClick(index) {
    // TODO: react to click
    if (this.gamePlay.cells[index].querySelector('.character')/* && персонаж играбельный */) {
      this.gamePlay.cells.forEach((item, idx) => {
        if (item.classList.contains('selected')) {
          this.gamePlay.deselectCell(idx);
        }
      });
      this.gamePlay.selectCell(index);
    } else {
      GamePlay.showError('В клетке нет игрока!');
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
    if (this.gamePlay.cells[index].querySelector('.character')/* есть персонаж на клетке */) {
      this.gamePlay.setCursor(cursors.pointer);
      const character = this.positions.find((item) => item.position === index);
      const levelInfo = String.fromCodePoint(0x1F396) + character.character.level;
      const attackInfo = String.fromCodePoint(0x2694) + character.character.attack;
      const defenceInfo = String.fromCodePoint(0x1F6E1) + character.character.defence;
      const healthInfo = String.fromCodePoint(0x2764) + character.character.health;
      const message = `${levelInfo} ${attackInfo} ${defenceInfo} ${healthInfo}`;
      this.gamePlay.showCellTooltip(message, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
    this.gamePlay.hideCellTooltip(index);
  }
}
