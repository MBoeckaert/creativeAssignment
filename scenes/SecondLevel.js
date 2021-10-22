import { addBg, levelText } from "../functions/lib.js";
import MainCharacter from "../classes/MainCharacter.js";
import Monster from "../classes/Monster.js";
import PlatformGroup from "../classes/PlatformGroup.js";
import FireGroup from "../classes/Fire.js";

export default class SecondLevel extends Phaser.Scene {
    constructor() {
        super({
            key: `level2`
        });
    }

    create() {
        //assets
        addBg(this);
        this.princess = new MainCharacter({ scene: this, x: 50, y: 525 });
        this.monster = new Monster({ scene: this, x: 750, y: 525 });
        this.platformGroup = new PlatformGroup(this);
        this.fire = new FireGroup(this);
        //all the text
        levelText(this, 2);
        this.gameOverText = this.add.text(400, 300, `Game Over`, { fontSize: `128px`, fill: `#ff0000` }).setInteractive({ cursor: `pointer` });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;
        this.playAgain = this.add.text(400, 350, `click to play again`, { fontSize: `32px`, fill: `#ffff` }).setInteractive({ cursor: `pointer` });
        this.playAgain.setOrigin(0.5, 0);
        this.playAgain.visible = false;

        //create a hitzone BIG SPRITE
        this.hitNextLevel = this.physics.add.sprite(100, 135, `portal`);
        this.hitNextLevel.setScale(0.03);

        this.creatingMovablePlatforms();
        this.fixedFloatingPlatform();
        this.smallFloatingPlatform();

        this.collidingInteractions();
        this.playerControls();
    }

    update() {
        this.playerMovement();
        this.leftFloatingPlatformMovement();
        this.rightFloatingPlatformMovement();
        this.monsterMovement();
    }

    creatingMovablePlatforms() {
        //Left movable platform
        this.leftFixedFloatingFloor = this.physics.add.image(250, 425, `floatingFloor`);
        this.leftFixedFloatingFloor.setImmovable(true);
        this.leftFixedFloatingFloor.body.allowGravity = false;
        this.leftFixedFloatingFloor.setVelocityX(50);

        //Right movable platform
        this.rightFixedFloatingFloor = this.physics.add.image(500, 425, `floatingFloor`);
        this.rightFixedFloatingFloor.setImmovable(true);
        this.rightFixedFloatingFloor.body.allowGravity = false;
        this.rightFixedFloatingFloor.setVelocityX(50);
    }

    fixedFloatingPlatform() {
        //floating fixed platforms
        this.fixedFloatingFloor = this.physics.add.staticGroup();
        this.fixedFloatingFloor.create(65, 500, `floatingFloor`);
        this.fixedFloatingFloor.create(735, 350, `floatingFloor`);
        this.fixedFloatingFloor.create(535, 200, `floatingFloor`);
        this.fixedFloatingFloor.create(471, 200, `floatingFloor`);
        this.fixedFloatingFloor.create(200, 200, `floatingFloor`);
        this.fixedFloatingFloor.create(136, 200, `floatingFloor`);
    }

    smallFloatingPlatform() {
        this.smallFloat = this.physics.add.staticGroup();
        this.smallFloat.create(735, 260, `smallFloat`).setScale(0.2).refreshBody();
    }

    collidingInteractions() {
        // princess interactions
        this.physics.add.collider(this.princess, this.platformGroup);
        this.physics.add.collider(this.princess, this.floatingFloor);
        this.physics.add.collider(this.princess, this.fixedFloatingFloor);
        this.physics.add.collider(this.princess, this.leftFixedFloatingFloor);
        this.physics.add.collider(this.princess, this.rightFixedFloatingFloor);
        this.physics.add.collider(this.princess, this.smallFloat);
        // monster interactions
        this.physics.add.collider(this.monster, this.platformGroup);
        this.physics.add.collider(this.monster, this.fixedFloatingFloor);
        // nextLevel interactions
        this.physics.add.collider(this.hitNextLevel, this.platformGroup);
        this.physics.add.collider(this.hitNextLevel, this.fixedFloatingFloor);
        // enemies interactions
        this.physics.add.collider(this.princess, this.monster, this.hitMonsterOrFire, null, this);
        this.physics.add.collider(this.princess, this.fire, this.hitMonsterOrFire, null, this);
        // nextLevel interactions
        this.physics.add.collider(this.princess, this.hitNextLevel, this.levelThree, null, this);
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

    leftFloatingPlatformMovement() {
        //Create Moving Platform
        if (this.leftFixedFloatingFloor.x >= 320) {
            this.leftFixedFloatingFloor.setVelocityX(-50);
        }
        else if (this.leftFixedFloatingFloor.x <= 250) {
            this.leftFixedFloatingFloor.setVelocityX(50);
        }
    }

    rightFloatingPlatformMovement() {
        //Create Moving Platform
        if (this.rightFixedFloatingFloor.x >= 600) {
            this.rightFixedFloatingFloor.setVelocityX(-50);
        }
        else if (this.rightFixedFloatingFloor.x <= 500) {
            this.rightFixedFloatingFloor.setVelocityX(50);
        }
    }

    monsterMovement() {
        if (this.monster.x >= 750) {
            this.monster.setVelocityX(-75);
            this.monster.flipX = false;
        }
        else if (this.monster.x <= 500) {
            this.monster.setVelocityX(75);
            this.monster.flipX = true;
        }
    }

    hitMonsterOrFire(player) {
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
        this.gameOverText.visible = true;
        this.playAgain.visible = true;

        this.input.on(`pointerdown`, () => {
            this.scene.start(`loadingscreen`);
        });
    }

    levelThree() {
        this.scene.start(`textLoadlvl3`);
    }


}