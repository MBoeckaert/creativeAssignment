export default class ThirdLevel extends Phaser.Scene {
    constructor(){
        super({
            key: `level4`
        });
    }

    create(){
        this.bg = this.add.image(0,0, `bg`);
        this.creatingPlatforms();
    }
}