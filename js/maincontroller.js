//------------------------------------------------------------------------------
//Other controls
Crafty.e('Keyboard').bind("KeyUp", function(e) {
    if (e.keyCode === Crafty.keys.UP_ARROW) {
        Crafty('BasketR').switchPosition();
        Crafty('BasketL').switchPosition();
    }
});

//------------------------------------------------------------------------------
//game !
//init elements
Crafty.e('Vigneron, 2D, Canvas, Color, Multiway, Collision');
Crafty.e('BasketL, Basket, Canvas, Color')
    .color('#FFCC00');

Crafty.e('BasketR, Basket, Canvas, Color')
    .color('#AAFF00');
//go
Crafty.e().bind("EnterFrame", function(e) {
    if (e.frame % 100 == 0) {
        var drop = game.nextDrop();
        drop.appearInGame();
    }
});

//------------------------------------------------------------------------------
//Testing
var setGameSpeed = function (_speed){
    game._speed = _speed;
};
