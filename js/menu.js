// Menu scene
var keyEnter;
var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function MenuScene() {
        Phaser.Scene.call(this, {key: 'menuScene'});
    },
    preload: function() {
        this.load.image("bg_start", "assets/bg_start.jpg");
    },
    create: function() {
        // Add background and text
        this.add.image(600, 800, "bg_start");
        var label = this.add.text(100, 100, "Carrot Frenzy", {
            font: "80px Calibri",
            fill: "#fff"
        });
        var subtitle = this.add.text(105, 200, "Press ENTER to play", {
            font: "30px Arial",
            fill: "#fff"
        });

        // Bind ENTER key
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    },
    update: function() {
        // If ENTER is pressed than start the game
        if(keyEnter.isDown) {
            console.log("Caaaaarots! Gotta catch 'em all.");
            this.scene.start('CarrotFrenzyScene');
        }
    }
});