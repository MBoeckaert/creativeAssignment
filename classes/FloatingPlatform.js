export default class FloatingPlatform extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, "floatingFloor");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        this.setImmovable(true);
        this.body.allowGravity = false;
        this.setScale(1);
    }
}