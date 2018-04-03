var game = new Phaser.Game(32*20, 32*15, Phaser.AUTO);

var Lvl;
var map;
var player;
var speed = 90;
var fireRate = 400;
var nextFire = 0;
var powderG;
var life = 3;
var ammo = 3;
var rope = 3;
var lifeC;
var ammoC;
var ropeC;

game.state.add('init', initState);
game.state.add('load', loadState);
game.state.add('level', levelState);
game.state.start('init');
