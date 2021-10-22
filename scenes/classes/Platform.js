export default class Platform extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, "floor");
        config.scene.add.existing(this);
    }
}