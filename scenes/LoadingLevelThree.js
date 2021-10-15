export default class LoadingLevelThree extends Phaser.Scene {
    constructor(){
        super({
            key: `textLoadlvl3`
        })
    }

    create(){
        this.bg = this.add.image(0,0, `bg`);
        Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
        this.startClick = this.add.text(400, 300, `Level 3`, {fontSize: `64px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.startClick.setOrigin(0.5);
        this.startClick = this.add.text(400, 350, `click to start`, {fontSize: `28px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.startClick.setOrigin(0.5);
        //click to go to secondLevel
        this.input.on(`pointerdown`, () => {
            this.scene.start(`level3`);
        });
    }
}