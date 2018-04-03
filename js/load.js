var loadState = {
	create: function(){
		start = game.add.sprite(-64, 0, 'blank');
		var t1 = game.add.text(160,40, 'Select Level', {font:'50px',fill: '#ffffff'});
		var L1 = this.add.sprite(130, 100, 'L1');
		var L2 = this.add.sprite(130, 200, 'L2');
		var L3 = this.add.sprite(130, 300, 'L3');

		L1.inputEnabled = true;
		L2.inputEnabled = true;
		L3.inputEnabled = true;

		L1.events.onInputUp.add(this.L1, this);
		L2.events.onInputUp.add(this.L2, this);
		L3.events.onInputUp.add(this.L3, this);

		console.log('load done');
		//game.state.start('level');
	},

	L1: function(){ Lvl='lvl1'; start.x=3*32+16; start.y=12*32+16; game.state.start('level');},
	L2: function(){ Lvl='lvl2'; start.x=2*32+16; start.y=97*32+16; game.state.start('level');},
	L3: function(){ Lvl='lvl3'; start.x=0*32+16; start.y=00*32+16; game.state.start('level');}
}
