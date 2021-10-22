export default class LoadingScreen extends Phaser.Scene {
    constructor() {
        super({
            key: `loadingscreen`
        })
    }

    create() {
        //click to start game
        this.input.on(`pointerdown`, () => {
            this.scene.start(`level4`);
        });

        //text
        this.startClick = this.add.text(400, 300, `Start Game`, { fontSize: `64px`, fill: `#ffff` }).setInteractive({ cursor: `pointer` });
        this.startClick.setOrigin(0.5);
    }
}