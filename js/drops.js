Crafty.c('Drop', {
    init: function() {
        this.requires('2D, Canvas, Color, Gravity, Collision');
        this.gravity('Floor');
        this.gravityConst(game._speed / 25);
        this._kind = this._getKind();
        this._columnNbr = this._getColumnNbr();
    },
    _getKind: function() {
        var kindIdx = Math.floor(Math.random() * game._kindsOfDrop.length);
        var kindOfDrop = game._kindsOfDrop[kindIdx];
        return kindOfDrop;
    },
    _getColumnNbr: function() {
        return Math.floor(Math.random() * game.COLUMNS) + 1;
    },
    _getRealPosition: function() {
        var position = [];

        //x position (Column position (pixel));
        var colEnd = this._columnNbr * game.COLUMN_WIDTH + game.ZONE_WIDTH;
        var x = colEnd - (game.COLUMN_WIDTH / 2) - (game.DROP_SIZE / 2);
        position.push(x);       

        //y position (pixel)
        position.push(0);
        return position;
    },
    _getColor: function() {
       return this._kind;
    },
    appearInGame: function() {
        var position = this._getRealPosition();
        this.color(this._getColor());
        this._gy = 0 //initial speed;
        this.attr({
            x: position[0],
            y: position[1],
            h: game.DROP_SIZE,
            w: game.DROP_SIZE
        });
    }
});

Game.prototype.nextDrop = function() {
    while (game._nextDrops.length <= game.MAX_DROPS_KNOW) {
        var drop = Crafty.e('Drop');
        game._nextDrops.push(drop);
    }
    var generatedDrop = game._nextDrops.shift();
    Crafty.trigger('DropGenerated', generatedDrop);
    return generatedDrop;
};
