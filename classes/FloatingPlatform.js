export default class FloatingPlatform extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, "floatingFloor");
        config.scene.add.existing(this);
        // config.scene.physics.add.existing(this); 
    }
}