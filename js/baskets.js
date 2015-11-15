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
        this.x = this._getFixPosition(this._position);
        this.multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180}); //FIXME _speed
        this.bind('Moved', function(position) {
            if (!this._switching) {
                this.x = this._getFixPosition(this._position);
            }
        });
        this.checkHits('Drop')
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
    switchPosition: function() {
        if (!this._switching) {
            this._switching = true;
            (this._position === 'left') ? this._toRight() : this._toLeft();
        }
    },
    _toRight: function() {
        var base_y = this.y;
        var x = (this._getFixPosition('left') - this._getFixPosition('right'));
        x = x / 2;
        var y = 0;

        var movement = function(e) {
            if (e.frame % 2 == 0) {
                x += 8;
                y = -0.25 * x^2;
                this.x +=8;
                this.y -= y;
                if (this.x >= this._getFixPosition('right')) {
                    this.y = base_y;
                    this.x = this._getFixPosition('right');
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
        var x = (this._getFixPosition('left') - this._getFixPosition('right'));
        x = x / 2;
        var y = 0;

        var movement = function(e) {
            x += 3;
            y = -0.25 * x^2;
            this.x -=3;
            this.y -= y;
            if (this.x <= this._getFixPosition('left')) {
                this.y = base_y;
                this.x = this._getFixPosition('left');
                this._position = 'left';
                this._switching = false;
                this.unbind('EnterFrame', movement);
            }
        };

        this.bind("EnterFrame", movement);
    },
    _getFixPosition: function(side) {
        if (side === 'left') {
            return Crafty('Vigneron').x;
        }
        return Crafty('Vigneron').x + game.VIGNERON_SIZE - game.BASKET_SIZE;
    }
});
