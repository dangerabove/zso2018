var initState = {
	preload: function(){
		this.game.load.image('tileset1', 'as/img/tileset1.png');
		this.game.load.image('L1', 'as/img/L1.png');
		this.game.load.image('L2', 'as/img/L2.png');
		this.game.load.image('L3', 'as/img/L3.png');
		this.game.load.image('player1', 'as/img/player.png');
		this.game.load.image('powder', 'as/img/powder.png');
		this.game.load.image('food', 'as/img/food.png');
		this.game.load.image('lifeC', 'as/img/lifeC.png');
		this.game.load.image('blank', 'as/img/blank.png');
		this.game.load.image('enemyS', 'as/img/enemyS.png');
		this.game.load.image('enemyL', 'as/img/enemyL.png');
		this.game.load.image('enemyI', 'as/img/enemyI.png');
		this.game.load.image('bullet', 'as/img/bullet.png');

		this.game.load.tilemap('lvl1','as/maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('lvl2','as/maps/level2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('lvl3','as/maps/level3.json', null, Phaser.Tilemap.TILED_JSON);

		this.game.load.spritesheet('slash1s', 'as/img/slash1.png', 32, 16);
		this.game.load.spritesheet('slash3s', 'as/img/slash3.png', 32, 16);
		this.game.load.spritesheet('slash2s', 'as/img/slash2.png', 16, 32);
		this.game.load.spritesheet('slash4s', 'as/img/slash4.png', 16, 32);
	},
	create: function() {
		console.log('init done');
		game.state.start('load');
	}
}
