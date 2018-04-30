// Play Scene
var CarrotFrenzyScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function CarrotFrenzyScene() {
        Phaser.Scene.call(this, {key: 'carrotFrenzyScene'});
    },
    preload: preload,
    create: create,
    update: update
});

var platforms, player1, player2, cursors, carrots, score1 = 0, score2 = 0, scoreText1, scoreText2, chocolates,
    gameOver;
var keyW, keyA, keyD;
var utils;
var platformData;

function preload() {
    utils = new Utils(this);
    utils.loadAssets();

    platformData = this.load.json("platformData", "assets/platforms.json");
}

function create() {


    // Bind W,A,D keys
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Bind arrow keys
    cursors = this.input.keyboard.createCursorKeys();

    // camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(player);
    this.cameras.main.setBackgroundColor("#ccccff");

    // Set background
    this.add.image(600, 300, 'bg_mountains');

    // Set the ground and platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(600, 600, 'ground').setScale(3).refreshBody().setTint(0x000);

    var groundHeight = platforms.children.entries[0].body.height;

    // Stone wall in the middle
    platforms.create(600, 600 - groundHeight / 2 - 50 / 2, 'stone_block');
    platforms.create(600, 600 - groundHeight / 2 - (50 + 50 / 2), 'stone_block');
    platforms.create(600, 600 - groundHeight / 2 - (2 * 50 + 50 / 2), 'stone_block');
    platforms.create(600, 600 - groundHeight / 2 - (3 * 50 + 50 / 2), 'stone_block');

    // Left side platforms
    platforms.create(50, 440, 'stone_block');
    platforms.create(100, 440, 'stone_block');
    platforms.create(150, 250, 'stone_block');
    platforms.create(400, 400, 'stone_block');
    platforms.create(350, 400, 'stone_block');

    // Right side platforms
    platforms.create(1150, 440, 'stone_block');
    platforms.create(1100, 440, 'stone_block');
    platforms.create(1050, 250, 'stone_block');
    platforms.create(800, 400, 'stone_block');
    platforms.create(850, 400, 'stone_block');

    // Middle top platforms
    platforms.create(600, 200, 'stone_block');
    platforms.create(500, 200, 'stone_block');
    platforms.create(550, 200, 'stone_block');
    platforms.create(650, 200, 'stone_block');
    platforms.create(700, 200, 'stone_block');

    // Player 1 object
    player1 = this.physics.add.sprite(200, 450, 'horse_right');
    player1.name = "player1";
    player1.setBounce(0.1);
    player1.setCollideWorldBounds(true);
    player1.body.setGravityY(150);

    // Player 2 object
    player2 = this.physics.add.sprite(1000, 450, 'horse_left');
    player2.name = "player2";
    player2.setBounce(0.1);
    player2.setCollideWorldBounds(true);
    player2.body.setGravityY(150);


    // Animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('horse_run_left', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn_right',
        frames: [{key: 'horse_right', frame: 0}],
        frameRate: 20
    });
    this.anims.create({
        key: 'turn_left',
        frames: [{key: 'horse_left', frame: 0}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('horse_run_right', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    // Collisions and overlaps
    this.physics.add.collider(player1, platforms);
    this.physics.add.collider(player2, platforms);

    carrots = this.physics.add.group({
        key: 'carrot',
        repeat: 9,
        setXY: {x: 12, y: 10, stepX: 120}
    });
    // Spawn carrots
    carrots.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));
    });
    this.physics.add.collider(carrots, platforms);
    this.physics.add.overlap(player1, carrots, collectCarrot, null, this);
    this.physics.add.overlap(player2, carrots, collectCarrot, null, this);

    chocolates = this.physics.add.group();

    this.physics.add.collider(chocolates, platforms);
    this.physics.add.collider(player1, chocolates, hitChocolate, null, this);
    this.physics.add.collider(player2, chocolates, hitChocolate, null, this);

    // Display scoring
    scoreText1 = this.add.text(16, 16, 'Player 1: 0', {fontSize: '32px', fill: '#fff'});
    scoreText2 = this.add.text(920, 16, 'Player 2: 0', {fontSize: '32px', fill: '#fff'});

    console.log("Pdata");
    // console.log(this.cache.game.getJSON('platformData'));
    console.log(this.cache.json.get("platformData"));
}

function update() {
    // Player 1 keys
    var canPlayer1Jump = cursors.up.isDown && player1.body.touching.down;
    if (cursors.left.isDown) {
        player1.setVelocityX(-300);
        player1.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player1.setVelocityX(300);
        player1.anims.play('right', true);
    } else {
        player1.setVelocityX(0);
        player1.anims.play('turn_right', true);
    }
    if (canPlayer1Jump) {
        player1.setVelocityY(-330);
    }

    // Player 2 keys
    if (keyA.isDown) {
        // left
        player2.setVelocityX(-300);
        player2.anims.play('left', true);
    } else if (keyD.isDown) {
        // right
        player2.setVelocityX(300);
        player2.anims.play('right', true);
    } else {
        player2.setVelocityX(0);
        player2.anims.play('turn_left', true);
    }
    if (keyW.isDown && player2.body.touching.down) {
        player2.setVelocityY(-330);
    }
}

function addScoreToPlayer(player, score) {
    if (player.name === "player1") {
        score1 += 1;
        scoreText1.setText("Player 1: " + score1);
    } else if (player.name === "player2") {
        score2 += 1;
        scoreText2.setText("Player 2: " + score2);
    }
}

function collectCarrot(player, carrot) {
    console.log(player.name);
    carrot.disableBody(true, true);
    console.log("Star collected");

    addScoreToPlayer(player, 1);

    if (carrots.countActive(true) === 0) {
        carrots.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var chocolate = chocolates.create(x, 16, 'chocolate');
        chocolate.setBounce(1);
        chocolate.setCollideWorldBounds(true);
        chocolate.setVelocity(Phaser.Math.Between(-200, 200), 20);
        chocolate.allowGravity = false;

    }
}

function decreaseScore(player) {
    if (player.name === "player1") {
        if (score1 < 10) {
            return 2;
        }
        score1 -= 10;
        scoreText1.setText("Player 1: " + score1);
    }
    else if (player.name === "player2") {
        if (score2 < 10) {
            return 1;
        }
        score2 -= 10;
        scoreText2.setText("Player 2: " + score2);
    }
    return 0;
}

function hitChocolate(player, chocolate) {
    console.log("You just hit a chocolate");

    var currentStats = decreaseScore(player);
    if (currentStats !== 0) {
        this.physics.pause();
        switch (currentStats) {
            case 1:
                player2.setTint(0xff0000);
                player2.anims.play('turn');
                break;
            case 2:
                player1.setTint(0xff0000);
                player1.anims.play('turn');
                break;
        }
        gameOver = true;
    }
}