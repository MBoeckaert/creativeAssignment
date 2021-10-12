export default class SecondLevel extends Phaser.Scene {
    constructor(){
        super({
            key: `level2`
        })
    }

    create(){
        //text
        this.startClick = this.add.text(400, 300, `Level 2`, {fontSize: `64px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.startClick.setOrigin(0.5);
    }
}