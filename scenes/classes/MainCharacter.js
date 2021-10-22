export default class MainCharacter extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "princess");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        this.setScale(0.3);
        this.refreshBody();
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
    }

}