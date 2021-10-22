export default class Fire extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, "fire");
        config.scene.add.existing(this);
    }
}