export default class FirstLevel extends Phaser.Scene {
    constructor(){
        super({
            key: `level1`
        }),
        this.gameOver = false;
    }

    //add sound
    //https://www.epidemicsound.com/music/genres/video-games/

    create(){
        //background
        this.bg = this.add.image(0,0, `bg`);
        Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
        //princess
        this.princess = this.physics.add.sprite(50, 750, `princess`);
        this.princess.setScale(0.3);
        //monster
        this.monster = this.physics.add.sprite(680, 500, `monster`);
        //all the text
        this.gameInfo = this.add.text(20, 20, `Level 1`, {fontSize: `16px`, fill: `#ffff`})
        this.gameOverText = this.add.text(400, 300, `Game Over`, {fontSize: `128px`, fill: `#ff0000`}).setInteractive({cursor: `pointer`});
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;
        this.playAgain = this.add.text(400, 350, `click to play again`, {fontSize: `32px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
        this.playAgain.setOrigin(0.5, 0);
        this.playAgain.visible = false;

        //create a hitzone BIG SPRITE
        this.hitNextLevel = this.physics.add.sprite(750, 550, `test`);

        this.creatingPlatforms();
        this.creatingMovablePlatforms();
        this.creatingFire();

        this.gamePhysics();
        this.collidingInteractions();
        this.playerControls();

    }

    update(){
        this.playerMovement();
        this.floatingPlatformMovement();
        this.monsterMovement();
    }

    creatingPlatforms(){
        //set floor platforms
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(128, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
        this.platforms.create(544, 590, `floor`).setScale(2).refreshBody();
        this.platforms.create(800, 590, `floor`).setScale(2).refreshBody();
    }
    
    creatingMovablePlatforms(){
        //Make a movable platform
        this.floatingFloor = this.physics.add.image(250,500, `floatingFloor`);
        this.floatingFloor.setImmovable(true);
        this.floatingFloor.body.allowGravity = false;
        this.floatingFloor.setVelocityX(50);
    }

    creatingFire(){
        //fire
        this.fire = this.physics.add.staticGroup();
        this.fire.create(276, 590, `fire`).refreshBody();
        this.fire.create(316, 590, `fire`).refreshBody();
        this.fire.create(356, 590, `fire`).refreshBody();
        this.fire.create(396, 590, `fire`).refreshBody();
    }

    gamePhysics(){
        //3. physics methods
        // this.princess.setVelocity(100,200);
        this.princess.setBounce(0.2);
        this.princess.setCollideWorldBounds(true);
        this.monster.setCollideWorldBounds(true);

        this.hitNextLevel.setCollideWorldBounds(true);
    }

    collidingInteractions(){
        //2. colliding interactions
        this.physics.add.collider(this.princess, this.platforms);
        this.physics.add.collider(this.princess, this.floatingFloor);
        this.physics.add.collider(this.monster, this.platforms);
            
        this.physics.add.collider(this.princess, this.monster, this.hitMonster, null, this);
        this.physics.add.collider(this.princess, this.fire, this.hitMonster, null, this);

        //collision is going to level 2
        this.physics.add.collider(this.princess, this.hitNextLevel, this.levelTwo, null, this);
    }

    playerControls(){
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

    playerMovement(){
        //create Player Movement
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.princess.setVelocityX(-100);
        }
        else if (this.cursors.right.isDown || this.keyE.isDown)
        {
            this.princess.setVelocityX(100);
        }else{
            this.princess.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.princess.body.touching.down) || (this.keyZ.isDown && this.princess.body.touching.down))
        {
            this.princess.setVelocityY(-245);
        }
    }

    floatingPlatformMovement(){
        //Create Moving Platform
        if (this.floatingFloor.x >= 370)
        {
            this.floatingFloor.setVelocityX(-50);
        }
        else if (this.floatingFloor.x <= 300)
        {
            this.floatingFloor.setVelocityX(50);
        }
    }

    monsterMovement(){
        //Create Moving Monster
        // this.monster.setVelocityX(50);
        if (this.monster.x >= 650)
        {
            this.monster.setVelocityX(-75);
        }
        else if (this.monster.x <= 425)
        {
            this.monster.setVelocityX(75);
        }
    }

    //Pause game when hit
    //Restart
    hitMonster(player, bomb){
        this.physics.pause();
        player.setTint(0xff0000);
        this.gameOver = true;
        this.gameOverText.visible = true;
        this.playAgain.visible = true;

        this.input.on(`pointerdown`, () => {
            this.scene.start(`loadingscreen`);
        });
    }

    levelTwo(){
        this.scene.start(`textLoadlvl2`);
    }

}