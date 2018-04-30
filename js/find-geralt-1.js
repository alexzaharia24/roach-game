var FindGeralt1 = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function FindGeralt1() {
        Phaser.Scene.call(this, {key: 'findGeralt1'});
    },
    preload: preload,
    create: create,
    update: update
});

var utils;
var worldBounds;
var player;
var platforms;
var camera;

function preload() {
    utils = new Utils(this);
    utils.loadAssets();
}

function create() {
    // Bind arrow keys
    cursors = this.input.keyboard.createCursorKeys();

    worldBounds = this.physics.world.bounds;
    worldBounds.width = 3000;

    // var ground = this.add.tileSprite(0, worldHeight + worldHeight / 2 - 50, 2*worldWidth, worldHeight, 'stone_block');
    // console.log(this.physics.world);



    // configure camera
    camera = this.cameras.main;
    console.log("Camera: ");
    console.log(this.cameras);
    camera.setBounds(0, 0, worldBounds.width, worldBounds.height);

    // background
    var background = this.add.image(camera.width / 2, camera.height / 2, "bg_mountains");
    background.fixedToCamera = true;

    // player
    player = this.physics.add.sprite(200, 450, 'horse_right');
    player.name = "player";
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(150);

    // set camera
    camera.startFollow(player);

    platforms = this.physics.add.staticGroup();
    // platforms.add(ground);
    for (var i = 0; i < worldBounds.width / 16; i++) {
        platforms.create(i * 600 / 2, 600 - 16, 'ground').setTint(0x000);

    }

    // console.log("Platforms: ");
    // console.log(platforms);
    // console.log("Player: ");
    // console.log(player);

    // Right side platforms
    platforms.create(1150, 440, 'stone_block');
    platforms.create(1100, 440, 'stone_block');
    platforms.create(1050, 250, 'stone_block');
    platforms.create(800, 400, 'stone_block');
    platforms.create(850, 400, 'stone_block');

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


    this.physics.add.collider(player, platforms);


}

function update() {
    // Player 1 keys
    var canPlayer1Jump = cursors.up.isDown && player.body.touching.down;
    if (cursors.left.isDown) {
        player.setVelocityX(-300);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn_right', true);
    }
    if (canPlayer1Jump) {
        player.setVelocityY(-330);
    }
}
