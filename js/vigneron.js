Crafty.c('Vigneron', {
    _canMove: true,
    _speed: 2,
    init: function() {
        this.requires('2D, Canvas, Color, Multiway, Collision');    
        this.attr({
           x: game.WIDTH / 2 - game.VIGNERON_SIZE / 2,
           y: game.HEIGHT - game.FLOOR_HEIGHT - game.VIGNERON_SIZE,
           w: game.VIGNERON_SIZE,
           h: game.VIGNERON_SIZE
        });
        this.color('#F00');
        this.multiway(2, {RIGHT_ARROW: 0, LEFT_ARROW: 180}); //FIXME _speed
        this.bind('Moved', function(position) {
            this._move(position);
        });
    },
    _move: function(position) {
        if (position.x < game.ZONE_WIDTH) {
            this.x += 2; //FIXME _speed
        }
        else if (position.x > game.WIDTH -
            game.ZONE_WIDTH - game.VIGNERON_SIZE) {
            this.x -= 2; // FIXME _speed
        }
    }
});
