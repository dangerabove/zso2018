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

		barrelEG = game.add.group();
		barrelEG.enableBody = true;
		barrelEG.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromObjects('PObjectLayer', 20, 'barrel',0, true, false, barrelEG);
		barrelEG.setAll('body.immovable', true);
		barrelEG.setAll('body.moves', false);

		barrelG = game.add.group();
		barrelG.enableBody = true;
		barrelG.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromObjects('PObjectLayer', 13, 'barrel',0, true, false, barrelG);
		barrelG.setAll('body.immovable', true);
		barrelG.setAll('body.moves', false);
		barrelEG.forEachAlive(function(barrelEG){barrelEG.animations.add('dieE', [4,5,6,7])});
		barrelG.forEachAlive(function(barrelG){barrelG.animations.add('die', [1,2,3])});

		nailsG = game.add.group();
		nailsG.enableBody = true;
		nailsG.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromObjects('ObjectLayer', 23, 'nail',0, true, false, nailsG);
		nailsG.forEachAlive(function(nailsG){nailsG.body.setSize(28,28,2,2)});

		player = game.add.sprite(start.x, start.y, 'player1');
		player.anchor.x=0.5;
		player.anchor.y=0.5;
  	game.physics.arcade.enable(player);
		this.camera.follow(player);
		player.body.setSize(28, 28, 2, 2);
		//[0-3 idle, 4-11 bot, 12-19 top, 20-27 left, 28-35 right,
		animL = player.animations.add('walkL', [20,21,22,23,24,25,26,27]);
		animR = player.animations.add('walkR', [28,29,30,31,32,33,34,35]);
		animT = player.animations.add('walkT', [12,13,14,15,16,17,18,19]);
		animB = player.animations.add('walkB', [4,5,6,7,8,9,10,11]);
		animshL = player.animations.add('shL', [44,45,46,47]);
		animshR = player.animations.add('shR', [48,49,50,51]);
		animshT = player.animations.add('shT', [40,41,42,43]);
		animshB = player.animations.add('shB', [36,37,38,39]);
		animslL = player.animations.add('slL', [60,61,62,63]);
		animslR = player.animations.add('slR', [64,65,66,67]);
		animslT = player.animations.add('slT', [56,57,58,59]);
		animslB = player.animations.add('slB', [52,53,54,55]);

		/*enemySG = game.add.group();
		enemySG.enableBody = true;
		map.createFromObjects('ObjectLayer', 8, 'enemyS',0, true, false, enemySG);*/

		enemyIG = game.add.group();
		enemyIG.enableBody = true;
		enemyIG.physicsBodyType = Phaser.Physics.ARCADE;
		map.createFromObjects('ObjectLayer', 10, 'enemyI',0, true, false, enemyIG);
		enemyIG.setAll('body.velocity.x', Ispeed);
		enemyIG.forEachAlive(function(enemyIG){enemyIG.body.setSize(44,44,-6, -6)});
		enemyIG.forEachAlive(function(enemyIG){enemyIG.animations.add('walkL', [16,17,18,19,20,21,22,23])});
		enemyIG.forEachAlive(function(enemyIG){enemyIG.animations.add('walkR', [24,25,26,27,28,29,30,31])});
		enemyIG.forEachAlive(function(enemyIG){enemyIG.animations.add('walkT', [8,9,10,11,12,13,14,15])});
		enemyIG.forEachAlive(function(enemyIG){enemyIG.animations.add('walkB', [0,1,2,3,4,5,6,7])});

		pathLG = game.add.group();
		pathLG.enableBody = true;
		map.createFromObjects('PObjectLayer', 17, 'blank',0, true, false, pathLG);
		pathLG.forEachAlive(function(pathLG){pathLG.body.setSize(30,30,1,1)});

		pathRG = game.add.group();
		pathRG.enableBody = true;
		map.createFromObjects('PObjectLayer', 6, 'blank',0, true, false, pathRG);
		pathRG.forEachAlive(function(pathRG){pathRG.body.setSize(30,30,1,1)});

		pathTG = game.add.group();
		pathTG.enableBody = true;
		map.createFromObjects('PObjectLayer', 16, 'blank',0, true, false, pathTG);
		pathTG.forEachAlive(function(pathTG){pathTG.body.setSize(30,30,1,1)});

		pathBG = game.add.group();
		pathBG.enableBody = true;
		map.createFromObjects('PObjectLayer', 7, 'blank',0, true, false, pathBG);
		pathBG.forEachAlive(function(pathBG){pathBG.body.setSize(30,30,1,1)});

				//bounce L=17,R=6,T=7,D=16,

		bulletP = game.add.group();
    bulletP.enableBody = true;
    bulletP.physicsBodyType = Phaser.Physics.ARCADE;
    bulletP.createMultiple(30, 'bullet');
    bulletP.setAll('anchor.x', 0.5);
    bulletP.setAll('anchor.y', 0.5);
		bulletP.setAll('outOfBoundsKill', true);
    bulletP.setAll('checkWorldBounds', true);

		/*bulletS = game.add.group();
    bulletS.enableBody = true;
    bulletS.physicsBodyType = Phaser.Physics.ARCADE;
    bulletS.createMultiple(30, 'bullet');
    bulletS.setAll('anchor.x', 0.5);
    bulletS.setAll('anchor.y', 0.5);
		bulletS.setAll('outOfBoundsKill', true);
    bulletS.setAll('checkWorldBounds', true);*/

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
		lifeI = this.add.sprite(5, 5, 'lifeC');
		lifeI.fixedToCamera = true;
		ammoI = this.add.sprite(lifeI.x, lifeI.y+43, 'ammoC');
		ammoI.fixedToCamera = true;

    console.log('level done');
  },
	update: function(){
		lifeC.setText('x' + life);
		ammoC.setText('x' + ammo);

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
		game.physics.arcade.collide(player, barrelEG);
		game.physics.arcade.collide(player, barrelG);
		game.physics.arcade.collide(bulletP, blockLayer, function(bulletP, blockLayer){bulletP.kill();}, null, this);
		game.physics.arcade.overlap(slash1, barrelEG, this.hitEG1, null, this);
		game.physics.arcade.overlap(slash2, barrelEG, this.hitEG2, null, this);
		game.physics.arcade.overlap(slash3, barrelEG, this.hitEG3, null, this);
		game.physics.arcade.overlap(slash4, barrelEG, this.hitEG4, null, this);
		game.physics.arcade.overlap(bulletP, barrelEG, this.hitEG5, null, this);
		game.physics.arcade.overlap(slash1, barrelG, this.hitG1, null, this);
		game.physics.arcade.overlap(slash2, barrelG, this.hitG2, null, this);
		game.physics.arcade.overlap(slash3, barrelG, this.hitG3, null, this);
		game.physics.arcade.overlap(slash4, barrelG, this.hitG4, null, this);
		game.physics.arcade.overlap(bulletP, barrelG, this.hitG5, null, this);
		game.physics.arcade.overlap(player, powderG, this.collectPowder, null, this);
		game.physics.arcade.overlap(player, foodG, this.collectFood, null, this);
		//game.physics.arcade.overlap(player, bulletS, this.hurtS, null, this);
		game.physics.arcade.overlap(player, nailsG, this.damageS, null, this);
		/*game.physics.arcade.overlap(enemySG, slash1, this.attackS1, null, this);
		game.physics.arcade.overlap(enemySG, slash2, this.attackS2, null, this);
		game.physics.arcade.overlap(enemySG, slash3, this.attackS3, null, this);
		game.physics.arcade.overlap(enemySG, slash4, this.attackS4, null, this);*/
		game.physics.arcade.overlap(enemyIG, slash1, this.attackI1, null, this);
		game.physics.arcade.overlap(enemyIG, slash2, this.attackI2, null, this);
		game.physics.arcade.overlap(enemyIG, slash3, this.attackI3, null, this);
		game.physics.arcade.overlap(enemyIG, slash4, this.attackI4, null, this);
		game.physics.arcade.overlap(enemyIG, bulletP, this.attackI5, null, this);
		game.physics.arcade.overlap(enemyIG, pathLG, this.hitLeft, null, this);
		game.physics.arcade.overlap(enemyIG, pathRG, this.hitRight, null, this);
		game.physics.arcade.overlap(enemyIG, pathTG, this.hitTop, null, this);
		game.physics.arcade.overlap(enemyIG, pathBG, this.hitBottom, null, this);
		game.physics.arcade.overlap(player, enemyIG, this.Intercept, null, this);
	  player.body.velocity.x = 0;
	  player.body.velocity.y = 0;

		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	    player.body.velocity.x -= speed;
			player.play('walkL', 10, false);
		}
	  else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	    player.body.velocity.x += speed;
			player.play('walkR', 10, false);
		}
	  else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	    player.body.velocity.y -= speed;
			player.play('walkT', 10, false);
		}
	  else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	    player.body.velocity.y += speed;
			player.play('walkB', 10, false);
		};

		if (animL.isPlaying||animL.frame==27||animslL.frame==63||animshL.frame==47){
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
					player.play('slL', 10, false);
        	nextFire = game.time.now + fireRate;
					slash4.x=player.x-32;
					slash4.y=player.y;
				};
			}

			else if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
				if (game.time.now > nextFire && ammo>0){
					player.play('shL', 10, false);
					nextFire = game.time.now + fireRate;
					var theshot = bulletP.getFirstExists(false);
        theshot.reset(player.x-4, player.y);
        theshot.body.velocity.x= -200;
				ammo -= 1;
				}
			}
		}
		else if (animR.isPlaying||animR.frame==35||animslR.frame==67||animshR.frame==51){
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
					player.play('slR', 10, false);
        	nextFire = game.time.now + fireRate;
					slash2.x=player.x+32;
					slash2.y=player.y;
				};
			}
			else if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
				if (game.time.now > nextFire && ammo>0){
					player.play('shR', 10, false);
					nextFire = game.time.now + fireRate;
					var theshot = bulletP.getFirstExists(false);
        theshot.reset(player.x+4, player.y);
        theshot.body.velocity.x= 200;
				ammo -= 1;
				}
			}
		}
		else if (animT.isPlaying||animT.frame==19||animslT.frame==59||animshT.frame==43){
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
					player.play('slT', 10, false);
        	nextFire = game.time.now + fireRate;
					slash1.x=player.x;
					slash1.y=player.y-32;
				};
			}
			else if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
				if (game.time.now > nextFire && ammo>0){
					player.play('shT', 10, false);
					nextFire = game.time.now + fireRate;
					var theshot = bulletP.getFirstExists(false);
        theshot.reset(player.x+6, player.y);
        theshot.body.velocity.y= -200;
				ammo -= 1;
				}
			}
		}
		if (animB.isPlaying||animB.frame==19||animslB.frame==55||animshB.frame==39){
			if(game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
				if (game.time.now > nextFire){
					player.play('slB', 10, false);
        	nextFire = game.time.now + fireRate;
					slash3.x=player.x;
					slash3.y=player.y+32;
				};
			}
			else if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
				if (game.time.now > nextFire && ammo>0){
					player.play('shB', 10, false);
					nextFire = game.time.now + fireRate;
					var theshot = bulletP.getFirstExists(false);
        theshot.reset(player.x-6, player.y);
        theshot.body.velocity.y= 200;
				ammo -=1;
				}
			}
		};

		if (life <= 0 && game.paused==false){
			game.paused = true;
			end = game.add.text(game.width/2, game.height/2, 'R.I.P', {fill: '#ff0000'});
      end.anchor.setTo(0.5, 0.5);
			//end.events.onInputDown.add(pressedE, this);
		};


		/*if (this.game.time.now > this.nextFireS){
		 	enemySG.forEachAlive(function(enemyS){
			 	this.nextFireS = this.game.time.now + this.fireRateS;
			 	var bullet = bulletS.getFirstExists(false);
				bullet.reset(this.enemySG.x, this.enemySG.y);
	      this.game.physics.arcade.moveToObject(bullet, this.player, 100);
		 }) }*/



	},
	/*pressedE: function(end){
		this.game.paused = false;
		life = 8;
		ammo = 3;
		this.game.state.start('load');
	},*/
	collectPowder: function(player,powder){powder.kill();ammo += 3;},
	collectFood: function(player,food){if(life < maxlife){food.kill();life += 1;};},
	//hurtS: function(player,bullet){bullet.kill();life -= 2;},
	/*attackS1: function(slash1, enemySG){enemySG.kill();console.log('hit');},
	attackS2: function(slash2, enemySG){enemySG.kill();console.log('hit');},
	attackS3: function(slash3, enemySG){enemySG.kill();console.log('hit');},
	attackS4: function(slash4, enemySG){enemySG.kill();console.log('hit');},*/
	attackI1: function(slash1, enemyIG){enemyIG.kill();console.log('hit');},
	attackI2: function(slash2, enemyIG){enemyIG.kill();console.log('hit');},
	attackI3: function(slash3, enemyIG){enemyIG.kill();console.log('hit');},
	attackI4: function(slash4, enemyIG){enemyIG.kill();console.log('hit');},
	attackI5: function(bulletP, enemyIG){enemyIG.kill();bulletP.kill();console.log('hit');},
	hitLeft: function(enemyIG, blank){enemyIG.body.velocity.x=Ispeed;enemyIG.body.velocity.y=0;enemyIG.play('walkR',5,true)},
	hitRight: function(enemyIG, blank){enemyIG.body.velocity.x=-Ispeed;enemyIG.body.velocity.y=0;enemyIG.play('walkL',5,true)},
	hitTop: function(enemyIG, blank){enemyIG.body.velocity.y=Ispeed;enemyIG.body.velocity.x=0;enemyIG.play('walkB',5,true)},
	hitBottom: function(enemyIG, blank){enemyIG.body.velocity.y=-Ispeed;enemyIG.body.velocity.x=0;enemyIG.play('walkT',5,true)},
	Intercept: function(player, enemyIG){if(this.game.time.now > nextInvul){nextInvul = this.game.time.now + invRate; life -=1}},
	damageS: function(player, nailsG){if(this.game.time.now > nextInvul){nextInvul = this.game.time.now + invRate*(4/3); life -=1}},
	Damage: function(){life -=4},
	hitEG1: function(slash1, barrelEG){barrelEG.play('dieE', 3, false); this.Damage(); barrelEG.body.checkCollision.none = true},
	hitEG2: function(slash2, barrelEG){barrelEG.play('dieE', 3, false); this.Damage(); barrelEG.body.checkCollision.none = true},
	hitEG3: function(slash3, barrelEG){barrelEG.play('dieE', 3, false); this.Damage(); barrelEG.body.checkCollision.none = true},
	hitEG4: function(slash4, barrelEG){barrelEG.play('dieE', 3, false); this.Damage(); barrelEG.body.checkCollision.none = true},
	hitEG5: function(bulletP, barrelEG){barrelEG.play('dieE', 3, false); bulletP.kill(); barrelEG.body.checkCollision.none = true},
	hitG1: function(slash1, barrelG){barrelG.play('die', 3, false); barrelG.body.checkCollision.none = true},
	hitG2: function(slash2, barrelG){barrelG.play('die', 3, false); barrelG.body.checkCollision.none = true},
	hitG3: function(slash3, barrelG){barrelG.play('die', 3, false); barrelG.body.checkCollision.none = true},
	hitG4: function(slash4, barrelG){barrelG.play('die', 3, false); barrelG.body.checkCollision.none = true},
	hitG5: function(bulletP, barrelG){barrelG.play('die', 3, false); bulletP.kill(); barrelG.body.checkCollision.none = true},
	render: function(){
		game.debug.body(player);
		/*game.debug.body(slash1);
		game.debug.body(slash2);
		game.debug.body(slash3);
		game.debug.body(slash4);*/
		//enemyIG.forEachAlive(function(enemyIG){game.debug.body(enemyIG)})
		//barrelEG.forEachAlive(function(barrelEG){game.debug.body(barrelEG)})
		//nailsG.forEachAlive(function(nailsG){game.debug.body(nailsG)})
	}
}
