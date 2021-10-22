export default class SmallFloatingPlatform extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, "smallFloat");
        config.scene.add.existing(this);
    }
}