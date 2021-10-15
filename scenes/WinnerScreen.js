export default class WinnerScreen extends Phaser.Scene {
    constructor(){
        super({
            key: `youWin`
        })
    }

    create(){
        //text
        this.startClick = this.add.text(400, 300, `You Win`, {fontSize: `64px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.startClick.setOrigin(0.5);

        this.startClick = this.add.text(400, 350, `Play Again?`, {fontSize: `28px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.startClick.setOrigin(0.5);
        //click to go to secondLevel
        this.input.on(`pointerdown`, () => {
            this.scene.start(`level1`);
        });
    }
}