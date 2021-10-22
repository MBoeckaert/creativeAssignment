import { addBg, levelText, gameText } from "../functions/lib.js";
import MainCharacter from "../classes/MainCharacter.js";
// import PlatformGroup from "../classes/PlatformGroup.js";
// import Platform from "../classes/PlatformGroup.js";
// import Fire from "../classes/Fire.js";
import Monster from "../classes/Monster.js";
// import SmallFloatingPlatform from "../classes/SmallFloatingPlatform.js";
import FloatingPlatform from "../classes/FloatingPlatform.js";

export default class FourthLevel extends Phaser.Scene {
    constructor() {
        super({
            key: `level4`
        });
        this.gameOver = false;
        this.platformGroup;
    }

    create() {
        //load all assets
        addBg(this);
        this.princess = new MainCharacter({ scene: this, x: 50, y: 525 });
        this.monster = new Monster({ scene: this, x: 680, y: 500 });
        // this.fire = new Fire({ scene: this, x: 128, y: 90 });
        // this.smallFloat = new SmallFloatingPlatform({ scene: this, x: 500, y: 290 });
        this.floatingPlatform = new FloatingPlatform({ scene: this, x: 500, y: 500 });

        //text gameInfo
        levelText(this, 4);
        gameText(this, 400, 200, `Save Mark!`);
        gameText(this, 400, 250, `Go through the portals and find him!`);
        gameText(this, 400, 300, `Use arrowkeys to move & jump`);

        this.playAgain = this.add.text(400, 350, `click to play again`, { fontSize: `32px`, fill: `#ffff` }).setInteractive({ cursor: `pointer` });
        this.playAgain.setOrigin(0.5, 0);
        this.playAgain.visible = false;

        this.creatingPlatforms();
        this.creatingFire();

        this.collidingInteractions();
        // collidingInteractions(this, this.princess, this.monster);
        // collidingInteractions(this, this.princess, this.floor);

        //controlllers
        this.playerControls();
    }

    update() {
        this.playerMovement();
        this.floatingPlatformMovement();
    };

    //create platforms
    creatingPlatforms() {
        //set floor platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(128, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
        this.platforms.create(544, 590, `floor`).setScale(2).refreshBody();
        this.platforms.create(800, 590, `floor`).setScale(2).refreshBody();
    }

    //create fire
    creatingFire() {
        this.fire = this.physics.add.staticGroup();
        const amountOfFire = 4;
        for (let i = 0; i < amountOfFire; i++) {
            this.create(276 + (i * 40), 590);
        }
    }

    collidingInteractions() {
        this.physics.add.collider(this.princess, this.monster);
        this.physics.add.collider(this.princess, this.platforms);
        this.physics.add.collider(this.monster, this.platformGroup);
        this.physics.add.collider(this.princess, this.floatingPlatform);
        this.physics.add.collider(this.princess, this.secondfloatingPlatform);
    }

    floatingPlatformMovement() {
        //Create Moving Platform
        if (this.floatingPlatform.x >= 370) {
            this.floatingPlatform.setVelocityX(-50);
        }
        else if (this.floatingPlatform.x <= 300) {
            this.floatingPlatform.setVelocityX(50);
        }
    }

    playerControls() {
        //4. get keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        //key Left
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        //key Right
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        //key Up
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        //key Down
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    playerMovement() {
        //create Player Movement
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.princess.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown || this.keyE.isDown) {
            this.princess.setVelocityX(100);
        } else {
            this.princess.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.princess.body.touching.down) || (this.keyZ.isDown && this.princess.body.touching.down)) {
            this.princess.setVelocityY(-245);
        }
    }
}

