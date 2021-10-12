export default class LoadingScreen extends Phaser.Scene {
    constructor(){
        super({
            key: `loadingscreen`
        })
    }

    create(){
        //click to start game
        this.input.on(`pointerdown`, () => {
            this.scene.start(`play`);
        });

        //text
        this.startClick = this.add.text(400, 300, `Click to Start`, {fontSize: `64px`, fill: `#ffff`});
        this.startClick.setOrigin(0.5);
    }
}