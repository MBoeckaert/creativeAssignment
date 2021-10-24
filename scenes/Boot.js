// import Platform from "./classes/Platform.js";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: `boot` })
    }

    preload() {
        this.load.image(`bg`, `assets/background2d.png`);
        this.load.spritesheet(`princess`, `assets/characters.png`, { frameWidth: 32, frameHeight: 128 });
        // this.load.spritesheet(`princessAll`, `assets/allChar.png`, {frameWidth: 32, frameHeight: 128});
        this.load.image(`monster`, `assets/monsters-0.png`);
        this.load.image(`fire`, `assets/fire.png`);
        this.load.image(`arrows`, `assets/arrows.png`);
        this.load.image(`floor`, `assets/groundFloor.png`);
        this.load.image(`floatingFloor`, `assets/floatingFloor.png`);
        this.load.image(`smallFloat`, `assets/smallFloatingFloor.png`);

        this.load.image(`male`, `assets/malechar.png`, { frameWidth: 32, frameHeight: 128 });
        this.load.image(`portal`, `assets/portal.png`, { frameWidth: 32, frameHeight: 128 });

        this.load.spritesheet(`playSound`, `assets/playSound.png`, { frameWidth: 32, frameHeight: 128 });
        this.load.image(`muteSound`, `assets/muteSound.png`, { frameWidth: 32, frameHeight: 128 });

        //music
        this.load.audio('theme', [
            `assets/8-bit-Win.ogg`,
            `assets/8-bit-Win.mp3`
        ]);

        this.load.on(`complete`, () => {
            // this.scene.start(`play`);
            this.scene.start(`loadingscreen`);
        });

        // console.log(Platform.add(5,6));
    }

    create() {
        const textStyle = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };
        const loadingString = `Loading...`;
        this.add.text(100, 100, loadingString, textStyle);

        //music start
        const music = this.sound.add(`theme`);
        // music.on(`pause`, listener);
        music.loop = true;
        music.play();
        // music.pause();

        this.creatingPlatforms();


    }

    update() {

    }

    creatingPlatforms() {
        //set floor platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(128, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
        this.platforms.create(544, 590, `floor`).setScale(2).refreshBody();
        this.platforms.create(800, 590, `floor`).setScale(2).refreshBody();
    }

}
//create class extends Entity
//new entity in other scenes
//learn.yorkcs.com space invaders