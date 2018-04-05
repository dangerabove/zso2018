var game = new Phaser.Game(32*15, 32*15, Phaser.AUTO);

var Lvl;
var map;
var player;
var speed = 90;
var fireRate = 400;
var nextFire = 0;
var invRate = 150;
var nextInvul = 0;
var powderG;
var foodG;
var life = 8;
var maxlife = 8;
var ammo = 3;
var rope = 3;
var start;

var enemySG;
var Ispeed = 110;
var bulletS;
//var fireRateS = 100;
//var nextFireS = 0;

var lifeC;
var ammoC;
var ropeC;
var lifeI;
var ammoI;
var ropeI;

game.state.add('init', initState);
game.state.add('load', loadState);
game.state.add('level', levelState);
game.state.start('init');
