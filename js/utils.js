function Utils(game) {
    this.loadAssets = function() {
        game.load.image('ground', 'assets/platform.png');
        game.load.image('bg_mountains', 'assets/bg_mountains.png');
        game.load.image('stone_block', 'assets/small_stone_block_texture.jpg');
        game.load.image('carrot', 'assets/small_carrot.png');
        game.load.image('chocolate', 'assets/choco.jpg');

        game.load.spritesheet('horse_left',
            './assets/sprite_horse_left.png',
            {frameWidth: 108, frameHeight: 67}
        );
        game.load.spritesheet('horse_right',
            './assets/sprite_horse_right.png',
            {frameWidth: 108, frameHeight: 67}
        );
        game.load.spritesheet('horse_run_left',
            './assets/sprite_horse_run_left.png',
            {frameWidth: 108, frameHeight: 73}
        );
        game.load.spritesheet('horse_run_right',
            './assets/sprite_horse_run_right.png',
            {frameWidth: 108, frameHeight: 73}
        );
    }
}