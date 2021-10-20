export default class MainCharacter extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, "princess");
        config.scene.add.existing(this);

        this.setup();
    }
    
    setup(){
        this.setScale(0.5);
    }

}