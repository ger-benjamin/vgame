//------------------------------------------------------------------------------
// Create zones
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
//Create dropsCleaner
Crafty.e('DropsCleaner, 2D, Canvas, Collision')
    .attr({x: game.ZONE_WIDTH, y: game.HEIGHT - game.FLOOR_HEIGHT -1,
           w: game.WIDTH - 2 * game.ZONE_WIDTH, h: game.FLOOR_HEIGHT})
    .checkHits('Drop')
    .bind('HitOn', function(drop) {
        drop[0].obj.destroy();
    });