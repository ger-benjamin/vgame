//------------------------------------------------------------------------------
//Create baskets
Crafty.c('Basket', {
    _numberOfDrops: 0,
    _kindOfDrop: undefined,
    _position: undefined,
    _positions: ['left', 'right'],
    _switching: false,
    init: function() {
        this.requires('2D, Multiway, Collision');
        this._position = this._positions[0];
        this._positions.shift();
        this.attr({
           x: 0,
           y: game.HEIGHT - game.FLOOR_HEIGHT - game.VIGNERON_SIZE / 2,
           w: game.BASKET_SIZE,
           h: game.BASKET_SIZE
        });
        this.x = this._getFixPositions()[this._position];
        this.multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180}); //FIXME _speed
        this.bind('Moved', function(position) {
            var positionLimit = this._getFixPositions();
            var isTooLeft = positionLimit['left'] <= game.ZONE_WIDTH;
            var isTooRight = positionLimit['right'] >= game.WIDTH -
                game.ZONE_WIDTH - game.BASKET_SIZE;
            if (Object.keys(this._keyDirection).length > 1) {
                if (isTooLeft) {
                    this.multiway(2, {RIGHT_ARROW: 0});
                }
                else if (isTooRight) {
                    this.multiway(2, {LEFT_ARROW: 180});
                }
            } else if (!isTooLeft && !isTooRight){
                this.multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180});
            }
        });
        this.checkHits('Drop');
        this.bind('HitOn', function(hits) {
            var drop = hits[0].obj;
            this.addDrop(drop);
            drop.destroy();
        });
    },
    addDrop: function(drop) {
        var kind = drop._kind;
        if (this._numberOfDrops <= 0) {
            this._kindOfDrop = kind;
            this.color(kind);
            this._numberOfDrops++;
            console.log('init');
        } else if (kind === this._kindOfDrop && this._numberOfDrops <= 4) {
            this._numberOfDrops++;
            console.log(this._numberOfDrops);
        } else {
            this._numberOfDrops = 0;
            this._kindOfDrop = undefined;
            console.log('loose');
            this.color('#FFFF00');
        }
    },
    isSwitching: function() {
      return this._switching;
    },
    switchPosition: function() {
        this._switching = true;
        (this._position === 'left') ? this._toRight() : this._toLeft();
    },
    _toRight: function() {
        var base_y = this.y;
        var fixedPositions = this._getFixPositions();
        var x = (fixedPositions['left'] - fixedPositions['right']);
        x = x / 2;
        var y = 0;

        var movement = function(e) {
            if (e.frame % 2 == 0) {
                var positionLimit = this._getFixPositions()['right'];
                x += 8;
                y = -0.25 * x^2;
                this.x +=8;
                this.y -= y;
                if (this.x >= positionLimit) {
                    this.y = base_y;
                    this.x = positionLimit;
                    this._position = 'right';
                    this._switching = false;
                    this.unbind('EnterFrame', movement);
                }
            }
        };

        this.bind("EnterFrame", movement);
    },
    _toLeft: function() {
        var base_y = this.y;
        var fixedPositions = this._getFixPositions();
        var x = (fixedPositions['left'] - fixedPositions['right']);
        x = x / 2;
        var y = 0;

        var movement = function(e) {
            var positionLimit = this._getFixPositions()['left'];
            x += 3;
            y = -0.25 * x^2;
            this.x -=3;
            this.y -= y;
            if (this.x <= positionLimit) {
                this.y = base_y;
                this.x = positionLimit;
                this._position = 'left';
                this._switching = false;
                this.unbind('EnterFrame', movement);
            }
        };

        this.bind("EnterFrame", movement);
    },
    _getFixPositions: function() {
        return {
            'left': Crafty('Vigneron').x,
            'right': Crafty('Vigneron').x + game.VIGNERON_SIZE - game.BASKET_SIZE
        };
    }
});
