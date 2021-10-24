import { addBg, levelText } from "../functions/lib.js";
import MainCharacter from "../classes/MainCharacter.js";
import Monster from "../classes/Monster.js";
import PlatformGroup from "../classes/PlatformGroup.js";
import FireGroup from "../classes/Fire.js";

export default class FirstLevel extends Phaser.Scene {
    constructor() {
        super({
            key: `level1`
        })
    }

    create() {
        //load assets
        addBg(this);
        this.princess = new MainCharacter({ scene: this, x: 50, y: 425 });
        // this.princess.playerControls;
        this.monster = new Monster({ scene: this, x: 680, y: 525 });
        this.platformGroup = new PlatformGroup(this);
        this.fire = new FireGroup(this);
        //all the text
        levelText(this, 1);
        this.gameText1 = this.add.text(400, 200, `Save Bobby!`, { fontSize: `32px`, fill: `#ffff` }).setOrigin(0.5);
        this.controllerText = this.add.text(20, 60, `Controllers`, { fontSize: `16px`, fill: `#ffff` });
        this.arrows = this.add.image(60, 90, `arrows`).setScale(0.15);
        this.gameText2 = this.add.text(400, 250, `Go through the portals and find him!`, { fontSize: `32px`, fill: `#ffff` }).setOrigin(0.5);
        this.gameOverText = this.add.text(400, 300, `Game Over`, { fontSize: `128px`, fill: `#ff0000` }).setInteractive({ cursor: `pointer` }).setOrigin(0.5);
        this.gameOverText.visible = false;
        this.playAgain = this.add.text(400, 350, `click to play again`, { fontSize: `32px`, fill: `#ffff` }).setInteractive({ cursor: `pointer` }).setOrigin(0.5);;
        this.playAgain.visible = false;

        this.hitNextLevel = this.physics.add.sprite(775, 540, `portal`);
        this.hitNextLevel.setScale(0.03);

        this.creatingMovablePlatforms();

        this.collidingInteractions();
        this.playerControls();
        // playerControls(this);
        // this.playerAnimations();

        //     this.soundButton = this.add.button(this.game.world.centerX + 240, this.game.world.centerY - 290, 'sprites', this.toggleMute, this, 'sound-icon', 'sound-icon', 'sound-icon');
        //     this.soundButton.fixedToCamera = true;
        //     if (!this.game.sound.mute) {
        //         this.soundButton.tint = 16777215;
        //     } else {
        //         this.soundButton.tint = 16711680;
        //     }
    }

    update() {
        this.playerMovement();
        // playerMovement(this);
        this.floatingPlatformMovement();
        this.monsterMovement();
    }
    //all extra functions
    creatingMovablePlatforms() {
        //Make a movable platform
        this.floatingFloor = this.physics.add.image(250, 500, `floatingFloor`);
        this.floatingFloor.setImmovable(true);
        this.floatingFloor.body.allowGravity = false;
        this.floatingFloor.setVelocityX(50);
    }

    collidingInteractions() {
        this.physics.add.collider(this.princess, this.platformGroup);
        this.physics.add.collider(this.princess, this.floatingFloor);
        this.physics.add.collider(this.monster, this.platformGroup);
        this.physics.add.collider(this.hitNextLevel, this.platformGroup);
        //hit enemies or fire
        this.physics.add.collider(this.princess, this.monster, this.hitMonsterOrFire, null, this);
        this.physics.add.collider(this.princess, this.fire, this.hitMonsterOrFire, null, this);
        //collision is going to level 2
        this.physics.add.collider(this.princess, this.hitNextLevel, this.levelTwo, null, this);
    }

    playerControls() {
        //4. get keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();
        //key Left, right, up, down
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    // playerAnimations() {
    //     this.anims.create({
    //         key: `left`,
    //         frames: this.anims.generateFrameNumbers(`princess`, { frames: [2, 3] }),
    //         frameRate: 5,
    //         repeat: -1
    //     });
    //     this.anims.create({
    //         key: 'right',
    //         frames: this.anims.generateFrameNumbers('princess', { frames: [0, 1] }),
    //         frameRate: 5,
    //         repeat: -1
    //     });
    // }

    playerMovement() {
        //create Player Movement
        if (this.cursors.left.isDown || this.keyA.isDown) {
            this.princess.setVelocityX(-100);
            this.princess.flipX = true;
        }
        else if (this.cursors.right.isDown || this.keyE.isDown) {
            this.princess.setVelocityX(100);
            this.princess.flipX = false;
        } else {
            this.princess.setVelocityX(0);

        }

        if ((this.cursors.up.isDown && this.princess.body.touching.down) || (this.keyZ.isDown && this.princess.body.touching.down)) {
            this.princess.setVelocityY(-245);
        }
    }

    floatingPlatformMovement() {
        //Create Moving Platform
        if (this.floatingFloor.x >= 370) {
            this.floatingFloor.setVelocityX(-50);
        }
        else if (this.floatingFloor.x <= 300) {
            this.floatingFloor.setVelocityX(50);
        }
    }

    monsterMovement() {
        if (this.monster.x >= 650) {
            this.monster.setVelocityX(-75);
            this.monster.flipX = false;
        }
        else if (this.monster.x <= 425) {
            this.monster.setVelocityX(75);
            this.monster.flipX = true;
        }
    }

    hitMonsterOrFire(player) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOverText.visible = true;
        this.playAgain.visible = true;
        this.gameText1.visible = false;
        this.gameText2.visible = false;

        this.input.on(`pointerdown`, () => {
            this.scene.start(`loadingscreen`);
        });
    }

    levelTwo() {
        this.scene.start(`level2`);
    }
}