var levelState = {
	create: function(){
		game.stage.backgroundColor = "#ffffff";
		map = game.add.tilemap(Lvl);
  	map.addTilesetImage('TILESET','tileset1');
		map.setCollisionBetween(1, 300, true, 'BlockLayer');
  	blockLayer = map.createLayer('BlockLayer');
		backLayer = map.createLayer('BackLayer');
		obsLayer = map.createLayer('ObsLayer');
  	backLayer.resizeWorld();
  	game.physics.startSystem(Phaser.Physics.ARCADE);

		player = game.add.sprite(32*3, 32*12, 'player1');
		player.anchor.x=0.5;
		player.anchor.y=0.5;
  	game.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.setSize(24,24,4,4);
		slash1 = game.add.sprite(-64, 0, 'slash1');
		slash1.anchor.x=0.5;
		slash1.anchor.y=0.5;
		slash2 = game.add.sprite(-64, 0, 'slash2');
		slash2.anchor.x=0.5;
		slash2.anchor.y=0.5;
		slash3 = game.add.sprite(-64, 0, 'slash3');
		slash3.anchor.x=0.5;
		slash3.anchor.y=0.5;
		slash4 = game.add.sprite(-64, 0, 'slash4');
		slash4.anchor.x=0.5;
		slash4.anchor.y=0.5;

		powderG = game.add.group();
		powderG.enableBody = true;
		map.createFromObjects('ObjectLayer', 14, 'powder',0, true, false, powderG);

		lifeC = this.add.text(45,5, 'x' + life, {font:'38px',fill: '#ffffff'});
		lifeC.fixedToCamera = true;
		ammoC = this.add.text(lifeC.x, lifeC.y+43, 'x' + ammo, {font:'38px',fill: '#ffffff'});
		ammoC.fixedToCamera = true;
		ropeC = this.add.text(lifeC.x, ammoC.y+43, 'x' + rope, {font:'38px',fill: '#ffffff'});
		ropeC.fixedToCamera = true;


    console.log('level done');
  },
	update: function(){
		slash1.x=-32;
		slash1.y=0;
		slash2.x=-32;
		slash2.y=0;
		slash3.x=-32;
		slash3.y=0;
		slash4.x=-32;
		slash4.y=0;
		game.physics.arcade.collide(player, blockLayer);
		game.physics.arcade.collide(player, obsLayer);
		game.physics.arcade.overlap(player, powderG, this.collectPowder, null, this);
	  player.body.velocity.x = 0;
	  player.body.velocity.y = 0;

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	    player.body.velocity.x -= speed;
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
        nextFire = game.time.now + fireRate;
				slash4.x=player.x-32;
				slash4.y=player.y;
				};
			};
		};
	  if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	    player.body.velocity.x += speed;
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
        nextFire = game.time.now + fireRate;
				slash2.x=player.x+32;
				slash2.y=player.y;
				};
			};
	  };
	  if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	    player.body.velocity.y -= speed;
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
        nextFire = game.time.now + fireRate;
				slash1.x=player.x;
				slash1.y=player.y-32;
				};
			};
	  };
	  if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	    player.body.velocity.y += speed;
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
        nextFire = game.time.now + fireRate;
				slash3.x=player.x;
				slash3.y=player.y+32;
				};
			};
	  };
	},
	collectPowder: function(player,powder){
		powder.kill();
  	ammo += 3;
	},
	render: function(){
		game.debug.body(player);
	}
}
