//------------------------------------------------------------------------------
//Box
Crafty.c('DropViewerBox', {
    _nextDropsImages: [],
    init: function() {
        var minSize = fitSize(1);
        this.requires('2D, Canvas, Color'),
        this.attr({
            x: game.WIDTH - game.ZONE_WIDTH + minSize / 2,
            y: minSize / 2,
            w: game.ZONE_WIDTH - minSize,
            h: game.ZONE_WIDTH - minSize
        });
        this.color('#F00');
        this._initDropsImages();
        this.bind('DropGenerated', function() {
            this.updateDropsImages();
        });
    },
    updateDropsImages: function() {
        var i, color;
        for (i = game.MAX_DROPS_KNOW -1; i >= 0; i--) {
            color = game._nextDrops[i]._kind;
            this._nextDropsImages[i].color(color);
        }
    },
    _initDropsImages: function() {
        var minSize = fitSize(1);
        var i, x, y, w, h, color;
        for (i = game.MAX_DROPS_KNOW -1; i >= 0; i--) {
            color = game._nextDrops[i]._kind;
            if (i !== game.MAX_DROPS_KNOW - 1) {
                x = this.x + this.w - minSize;
                y = this.y + this.h - minSize / 4 - (i * minSize + minSize / 2);
                w = minSize /2 ;
                h = minSize /2 ;
            } else {
                x = this.x + minSize / 2;
                y = this.y + this.h / 2 - minSize;
                w = minSize * 2;
                h = minSize * 2;
            }
            var dropImage = this._initDropImage(x, y, w, h, color);
            this._nextDropsImages.push(dropImage);
      }
    },
    _initDropImage: function(x, y, w, h, color) {
        return Crafty.e('DropImage, 2D, Canvas, Color')
            .attr({
                x: x,
                y: y,
                w: w,
                h: h    
            })
            .color(color);
    }
});
