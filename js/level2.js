EnemySf = function(game){
	Phaser.Sprite.call


}













var levelState = {
	create: function(){

		game.stage.backgroundColor = "#ffffff";
		map = game.add.tilemap(Lvl);
  	map.addTilesetImage('TILESET','tileset1');
		map.setCollisionBetween(1, 300, true, 'BlockLayer');
  	blockLayer = map.createLayer('BlockLayer');
		backLayer = map.createLayer('BackLayer');
		obsLayer = map.createLayer('ObsLayer');
		//pathLayer = map.createLayer('PathLayer');
  	backLayer.resizeWorld();
  	game.physics.startSystem(Phaser.Physics.ARCADE);

		player = game.add.sprite(start.x, start.y, 'player1');
		player.anchor.x=0.5;
		player.anchor.y=0.5;
  	game.physics.arcade.enable(player);
		this.camera.follow(player);
		slash1 = game.add.sprite(-64, 0, 'slash1s');
		slash1.anchor.x=0.5;
		slash1.anchor.y=0.5;
		slash2 = game.add.sprite(-64, 0, 'slash2s');
		slash2.anchor.x=0.5;
		slash2.anchor.y=0.5;
		slash3 = game.add.sprite(-64, 0, 'slash3s');
		slash3.anchor.x=0.5;
		slash3.anchor.y=0.5;
		slash4 = game.add.sprite(-64, 0, 'slash4s');
		slash4.anchor.x=0.5;
		slash4.anchor.y=0.5;

		[slash1,slash2,slash3,slash4].enableBody = true;
		game.physics.arcade.enable([slash1,slash2,slash3,slash4]);

		powderG = game.add.group();
		powderG.enableBody = true;
		map.createFromObjects('ObjectLayer', 14, 'powder',0, true, false, powderG);

		foodG = game.add.group();
		foodG.enableBody = true;
		map.createFromObjects('ObjectLayer', 15, 'food',0, true, false, foodG);

		enemySG = game.add.group();
		enemySG.enableBody = true;
		map.createFromObjects('ObjectLayer', 8, 'enemyS',0, true, false, enemySG);

		enemyIG = game.add.group();
		enemyIG.enableBody = true;
		enemyIG.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromObjects('ObjectLayer', 10, 'enemyI',0, true, false, enemyIG);
		enemyIG.setAll('body.velocity.x', Ispeed);
		enemyIG.forEachAlive(function(enemyIG){enemyIG.body.setSize(44,44,-6, -6)})

		pathLG = game.add.group();
		pathLG.enableBody = true;
		map.createFromObjects('PObjectLayer', 17, 'blank',0, true, false, pathLG);

		pathRG = game.add.group();
		pathRG.enableBody = true;
		map.createFromObjects('PObjectLayer', 6, 'blank',0, true, false, pathRG);

		pathTG = game.add.group();
		pathTG.enableBody = true;
		map.createFromObjects('PObjectLayer', 16, 'blank',0, true, false, pathTG);

		pathBG = game.add.group();
		pathBG.enableBody = true;
		map.createFromObjects('PObjectLayer', 7, 'blank',0, true, false, pathBG);

		//game.physics.arcade.enable(enemyIG);
		//enemyIG.forEachAlive(function(){game.physics.arcade.enable(enemyIG)}, this);


				//bounce L=17,R=6,T=7,D=16,

		/*map.setTileIndexCallback(17, this.hitLeft, this);
		map.setTileIndexCallback(6, this.hitRight, this);
		map.setTileIndexCallback(7, this.hitTop, this);
		map.setTileIndexCallback(16, this.hitBottom, this);*/

		bulletS = game.add.group();
    bulletS.enableBody = true;
    bulletS.physicsBodyType = Phaser.Physics.ARCADE;
    bulletS.createMultiple(30, 'bullet');
    bulletS.setAll('anchor.x', 0.5);
    bulletS.setAll('anchor.y', 0.5);
		bulletS.setAll('outOfBoundsKill', true);
    bulletS.setAll('checkWorldBounds', true);

		/*enemyLG = game.add.group();
		enemyLG.enableBody = true;
		map.createFromObjects('ObjectLayer', x, 'enemyL',0, true, false, enemyLG);*/

		/*enemyIG = game.add.group();
		enemyIG.enableBody = true;
		map.createFromObjects('ObjectLayer', x, 'enemyI',0, true, false, enemyIG);*/

		lifeC = this.add.text(45,5, 'x' + life, {font:'38px',fill: '#ffffff'});
		lifeC.fixedToCamera = true;
		ammoC = this.add.text(lifeC.x, lifeC.y+43, 'x' + ammo, {font:'38px',fill: '#ffffff'});
		ammoC.fixedToCamera = true;
		ropeC = this.add.text(lifeC.x, ammoC.y+43, 'x' + rope, {font:'38px',fill: '#ffffff'});
		ropeC.fixedToCamera = true;
		lifeI = this.add.sprite(5, 5, 'lifeC');
		lifeI.fixedToCamera = true;
		ammoI = this.add.sprite(lifeI.x, lifeI.y+43, 'ammoC');
		ammoI.fixedToCamera = true;
		ropeI = this.add.sprite(lifeI.x, ammoI.y+43, 'ropeC');
		ropeI.fixedToCamera = true;

		enemySG.fireRateS = 100;
		enemySG.nextFireS = 0;

    console.log('level done');
  },
	update: function(){
		lifeC.setText('x' + life);
		ammoC.setText('x' + ammo);
		ropeC.setText('x' + rope);

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
		game.physics.arcade.overlap(player, foodG, this.collectFood, null, this);
		game.physics.arcade.overlap(player, bulletS, this.hurtS, null, this);
		game.physics.arcade.overlap(enemySG, slash1, this.attackS1, null, this);
		game.physics.arcade.overlap(enemySG, slash2, this.attackS2, null, this);
		game.physics.arcade.overlap(enemySG, slash3, this.attackS3, null, this);
		game.physics.arcade.overlap(enemySG, slash4, this.attackS4, null, this);
		game.physics.arcade.overlap(enemyIG, slash1, this.attackI1, null, this);
		game.physics.arcade.overlap(enemyIG, slash2, this.attackI2, null, this);
		game.physics.arcade.overlap(enemyIG, slash3, this.attackI3, null, this);
		game.physics.arcade.overlap(enemyIG, slash4, this.attackI4, null, this);
		//game.physics.arcade.overlap(slash1, powderG, this.collectPowder, null, this);
		game.physics.arcade.overlap(enemyIG, pathLG, this.hitLeft, null, this);
		game.physics.arcade.overlap(enemyIG, pathRG, this.hitRight, null, this);
		game.physics.arcade.overlap(enemyIG, pathTG, this.hitTop, null, this);
		game.physics.arcade.overlap(enemyIG, pathBG, this.hitBottom, null, this);
		game.physics.arcade.overlap(player, enemyIG, this.Intercept, null, this);
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

		/*if (this.game.time.now > this.nextFireS){
		 	enemySG.forEachAlive(function(enemyS){
			 	this.nextFireS = this.game.time.now + this.fireRateS;
			 	var bullet = bulletS.getFirstExists(false);
				bullet.reset(this.enemySG.x, this.enemySG.y);
	      this.game.physics.arcade.moveToObject(bullet, this.player, 100);
		 }) }*/



	},
	collectPowder: function(player,powder){
		powder.kill();
  	ammo += 3;
	},
	collectFood: function(player,food){
		if(life < maxlife){
		food.kill();
		life += 1;
		};
	},
	hurtS: function(player,bullet){
		bullet.kill();
  	life -= 2;
	},
	attackS1: function(slash1, enemySG){
		enemySG.kill();
		console.log('hit');
	},
	attackS2: function(slash2, enemySG){
		enemySG.kill();
		console.log('hit');
	},
	attackS3: function(slash3, enemySG){
		enemySG.kill();
		console.log('hit');
	},
	attackS4: function(slash4, enemySG){
		enemySG.kill();
		console.log('hit');
	},
	attackI1: function(slash1, enemyIG){
		//enemySG.HP -= 1;
		enemyIG.kill();
		console.log('hit');
	},
	attackI2: function(slash2, enemyIG){
		enemyIG.kill();
		console.log('hit');
	},
	attackI3: function(slash3, enemyIG){
		enemyIG.kill();
		console.log('hit');
	},
	attackI4: function(slash4, enemyIG){
		enemyIG.kill();
		console.log('hit');
	},
	hitLeft: function(enemyIG, blank){enemyIG.body.velocity.x=Ispeed;enemyIG.body.velocity.y=0},
	hitRight: function(enemyIG, blank){enemyIG.body.velocity.x=-Ispeed;enemyIG.body.velocity.y=0},
	hitTop: function(enemyIG, blank){enemyIG.body.velocity.y=Ispeed;enemyIG.body.velocity.x=0;},
	hitBottom: function(enemyIG, blank){enemyIG.body.velocity.y=-Ispeed;enemyIG.body.velocity.x=0;},
	Intercept: function(player, enemyIG){if(this.game.time.now > nextInvul){nextInvul = this.game.time.now + invRate; life -=1}},
	render: function(){
		game.debug.body(player);
		game.debug.body(slash1);
		game.debug.body(slash2);
		game.debug.body(slash3);
		game.debug.body(slash4);
		enemyIG.forEachAlive(function(enemyIG){game.debug.body(enemyIG)})
	}
}
