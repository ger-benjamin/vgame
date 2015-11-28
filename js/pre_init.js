//Init Crafty
Crafty.init(game.WIDTH, game.HEIGHT, document.getElementById('game'));

//------------------------------------------------------------------------------
// Create constantes
REF_SIZE = 30; //Pixels
fitSize = function (val) {
  return val * REF_SIZE;
};

var Game = function game() {
    this.WIDTH = fitSize(24);
    this.HEIGHT = fitSize(24);
    this.VIGNERON_SIZE = fitSize(6);
    this.BASKET_SIZE = fitSize(2);
    this.ZONE_WIDTH = fitSize(5);
    this.FLOOR_HEIGHT = fitSize(1);
    this.DROP_SIZE = fitSize(1);
    this.COLUMNS = 7;
    this.MAX_DROPS_KNOW = 5;
    this.TICK = 1000; //ms
    this.INCREMENT_TICK = 50; //ms
    this.MAX_SPEED = 40;
    this._speed = 1;
    this._score = 0;
    this._combo = 0;
    this._kindsOfDrop = ['green', 'blue', 'red'];
    this._nextDrops = [];
};
game = new Game();
Game.prototype.COLUMN_WIDTH = (game.WIDTH - 2 * game.ZONE_WIDTH) / game.COLUMNS;


