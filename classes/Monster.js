export default class Monster extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "monster");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
    }
}