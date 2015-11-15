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
    this.TICK = 1000; //ms
    this.INCREMENT_TICK = 50; //ms
    this.MAX_SPEED = 40;
    this._speed = 1;
    this._score = 0;
    this._combo = 0;
    this._kindsOfDrop = ['white'];
    this._nextDrops = [];
};
game = new Game();
Game.prototype.COLUMN_WIDTH = (game.WIDTH - 2 * game.ZONE_WIDTH) / game.COLUMNS;

//------------------------------------------------------------------------------
// Create zones

Crafty.init(game.WIDTH, game.HEIGHT, document.getElementById('game'));

Crafty.e('UpperLeftZone, 2D, Canvas, Color')
    .attr({x: 0, y: 0, w: game.ZONE_WIDTH, h: game.HEIGHT / 2 })
    .color('#CCCCAA');
  
Crafty.e('BottomLeftZone, 2D, Canvas, Color')
    .attr({x: 0, y: game.HEIGHT / 2, w: game.ZONE_WIDTH, h: game.HEIGHT / 2})
    .color('#AACCCC');
  
Crafty.e('RightZone, 2D, Canvas, Color')
    .attr({x: game.WIDTH - game.ZONE_WIDTH, y: 0, w: game.ZONE_WIDTH,
           h: game.HEIGHT})
    .color('#CCAACC');

Crafty.e('Floor, 2D, Canvas, Color')
    .attr({x: game.ZONE_WIDTH, y: game.HEIGHT - game.FLOOR_HEIGHT,
           w: game.WIDTH - 2 * game.ZONE_WIDTH, h: game.FLOOR_HEIGHT})
    .color('#444422');

//------------------------------------------------------------------------------
//Create Vigneron
Crafty.c('Vigneron', {
    _canMove: true,
    _speed: 2
});

Crafty.e('Vigneron, 2D, Canvas, Color, Multiway, Collision')
    .attr({x: game.WIDTH / 2 - game.VIGNERON_SIZE / 2,
           y: game.HEIGHT - game.FLOOR_HEIGHT - game.VIGNERON_SIZE,
           w: game.VIGNERON_SIZE,
           h: game.VIGNERON_SIZE})
    .color('#F00')
    .multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180}) //FIXME _speed
    .bind('Moved', function(position) {
        if (position.x < game.ZONE_WIDTH) {
            this.x += 2; //FIXME _speed
        }
        else if (position.x > game.WIDTH - game.ZONE_WIDTH - game.VIGNERON_SIZE){
            this.x -= 2; // FIXME _speed
        }
   });

//------------------------------------------------------------------------------
//Create baskets
Crafty.c('BasketL', {
    _nomberOfDrops: 0,
    _kindOfDrop: undefined
});

Crafty.e('BasketL, 2D, Canvas, Color, Multiway, Collision')
    .attr({x: game.WIDTH / 2 - game.VIGNERON_SIZE / 2,
           y: game.HEIGHT - game.FLOOR_HEIGHT - game.VIGNERON_SIZE / 2,
           w: game.BASKET_SIZE,
           h: game.BASKET_SIZE})
    .color('#FF00FF')
    .multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180}) //FIXME _speed
    .checkHits('Drop')
    .bind('Moved', function(position) {
        this.x = Crafty('Vigneron').x;
    })
    .bind('HitOn', function(drop) {
        console.log('+1L')
        drop[0].obj.destroy();
    });

//------------------------------------------------------------------------------
//Create drops

Crafty.c('Drop', {
    init: function() {
        this.kind = undefined;
    }
});

Game.prototype.nextDrop = function() {
    while (game._nextDrops.length < 5) {

        //Column between 1 and game.COLUMNS
        var columnNumber = Math.floor(Math.random() * game.COLUMNS) + 1;
        //Column position (pixel);
        var colEnd = columnNumber * game.COLUMN_WIDTH + game.ZONE_WIDTH;
        var position = colEnd - (game.COLUMN_WIDTH / 2) - (game.DROP_SIZE / 2);

        //get Kind of drop
        var kindIdx = Math.floor(Math.random() * game._kindsOfDrop.length) + 1;
        var kindOfDrop = game._kindsOfDrop[kindIdx];

        var drop = Crafty.e('Drop, 2D, Canvas, Color, Gravity, Collision')
            .color('#FF6622')
            .gravity('Floor')
            .gravityConst(game._speed / 25);

        drop.kind = kindOfDrop;

        game._nextDrops.push(drop);
    }
    return game._nextDrops.shift();
};

Crafty.e().bind("EnterFrame", function(e) {
    if (e.frame % 200 == 0) {
        var columnNumber = Math.floor(Math.random() * game.COLUMNS) + 1;
        var drop = game.nextDrop();
        //drop.attr({x: position, y: 0, w: game.DROP_SIZE, h: game.DROP_SIZE})
    }
});

//------------------------------------------------------------------------------
//Create dropsCleaner
Crafty.e('DropsCleaner, 2D, Canvas, Collision')
    .attr({x: game.ZONE_WIDTH, y: game.HEIGHT - game.FLOOR_HEIGHT -1,
           w: game.WIDTH - 2 * game.ZONE_WIDTH, h: game.FLOOR_HEIGHT})
    .checkHits('Drop')
    .bind('HitOn', function(drop) {
        drop[0].obj.destroy();
    });

//------------------------------------------------------------------------------
//Other controls
Crafty.e('Keyboard').bind("KeyUp", function(e) {
    if (e.keyCode === Crafty.keys.UP_ARROW) {
        console.log('Key up !');
    }
});

//------------------------------------------------------------------------------
//Testing
var setGameSpeed = function (_speed){
    game._speed = _speed;
};
