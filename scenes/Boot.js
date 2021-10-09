

export default class Boot extends Phaser.Scene {
    constructor(){
        super({
            key: `boot`
        });
    }

    preload(){
        this.load.image(`bg`, `assets/background2d.png`);
        this.load.image(`princess`, `assets/characters.png`);

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        } )
    }

    create(){
        const textStyle = {
            fontFamily: `sans-serif`,
            fontSize: `40px`, 
            color: `#ffffff`
        };
        const loadingString = `Loading...`;
        this.add.text(100, 100, loadingString, textStyle);

        
    }

    update(){

    }

}