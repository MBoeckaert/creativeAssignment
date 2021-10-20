    //Look this up for startFollow
    //https://labs.phaser.io/edit.html?src=src/camera/follow%20zoom%20tilemap.js&v=3.55.2

    //moving bg
    //https://phaser.io/examples/v3/view/camera/set-bounds

    //make bg image wider than view

import {levelText} from "../functions/lib.js";

    export default class ThirdLevel extends Phaser.Scene {
        constructor(){
            super({
                key: `level3`
            });
        }

        create(){
            //background
            this.bg = this.add.image(0,0, `bg`);
            Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
            //princess
            this.princess = this.physics.add.sprite(50, 750, `princess`);
            this.princess.setScale(0.3);
            this.princess.setBounce(0.2);
            //monster
            this.monster = this.physics.add.sprite(801, 125, `monster`);
            
            //all the text
            levelText(this, 3);
            this.saveMe = this.add.text(450, 20, `Help me Cassy, I'm stuck`, {fontSize: `16px`, fill: `#ffff`})
            this.gameOverText = this.add.text(400, 300, `Game Over`, {fontSize: `128px`, fill: `#ff0000`}).setInteractive({cursor: `pointer`});
            this.gameOverText.setOrigin(0.5);
            this.gameOverText.visible = false;
            this.playAgain = this.add.text(400, 350, `click to play again`, {fontSize: `32px`, fill: `#ffff`}).setInteractive({cursor: `pointer`});
            this.playAgain.setOrigin(0.5, 0);
            this.playAgain.visible = false;
    
            //create a hitzone BIG SPRITE
            this.hitNextLevel = this.physics.add.sprite(425, 50, `male`);
            this.hitNextLevel.setScale(0.06);
    
            this.creatingPlatforms();
            this.creatingMovablePlatforms();
            this.fixedFloatingPlatform();
            this.smallFloatingPlatform();

            this.creatingFire();
    
            this.gamePhysics();
            this.collidingInteractions();
            this.playerControls();
    
        }
    
        update(){
            this.playerMovement();
            this.leftFloatingPlatformMovement();
            this.rightFloatingPlatformMovement();
            this.monsterMovement();
        }
    
        creatingPlatforms(){
            //set floor platforms
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(128, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
            this.platforms.create(865, 590, 'floor').setScale(2).refreshBody();
        }
        
        creatingMovablePlatforms(){
            //Left movable platform
            this.leftFixedFloatingFloor = this.physics.add.image(250,425, `floatingFloor`);
            this.leftFixedFloatingFloor.setImmovable(true);
            this.leftFixedFloatingFloor.body.allowGravity = false;
            this.leftFixedFloatingFloor.setVelocityX(50);

            //Right movable platform
            this.rightFixedFloatingFloor = this.physics.add.image(500,500, `floatingFloor`);
            this.rightFixedFloatingFloor.setImmovable(true);
            this.rightFixedFloatingFloor.body.allowGravity = false;
            this.rightFixedFloatingFloor.setVelocityX(50);
        }

        fixedFloatingPlatform(){
            //floating fixed platforms
            this.fixedFloatingFloor = this.physics.add.staticGroup();
            this.fixedFloatingFloor.create(65,500, `floatingFloor`);
            this.fixedFloatingFloor.create(65,350, `floatingFloor`);
            this.fixedFloatingFloor.create(735,175, `floatingFloor`);
            this.fixedFloatingFloor.create(425,80, `floatingFloor`);
        }

        smallFloatingPlatform(){
            this.smallFloat = this.physics.add.staticGroup();
            const amountOfFloat = 3;
            for(let i = 0; i < amountOfFloat; i++){
                this.smallFloat.create(225 + (i*175), 275 - (i*25), `smallFloat`).setScale(0.2).refreshBody();
            }
            this.smallFloat.create(575,125, `smallFloat`).setScale(0.2).refreshBody();
        }

        creatingFire(){
            //fires
            this.fire = this.physics.add.staticGroup();
            const amountOfFire = 12;
            for(let i =0; i < amountOfFire; i++){
                this.fire.create(275 + (i*40), 590, `fire`).refreshBody();
            }
        }
    
        gamePhysics(){
            //3. physics methods
            // this.princess.setVelocity(100,200);
            this.princess.setCollideWorldBounds(true);
            this.monster.setCollideWorldBounds(true);
    
            this.hitNextLevel.setCollideWorldBounds(true);
        }
    
        collidingInteractions(){
            //2. colliding interactions
            this.physics.add.collider(this.princess, this.platforms);
            this.physics.add.collider(this.princess, this.floatingFloor);
            this.physics.add.collider(this.princess, this.fixedFloatingFloor);
            this.physics.add.collider(this.princess, this.leftFixedFloatingFloor);
            this.physics.add.collider(this.princess, this.rightFixedFloatingFloor);
            this.physics.add.collider(this.princess, this.smallFloat);

            this.physics.add.collider(this.monster, this.platforms);
            this.physics.add.collider(this.monster, this.fixedFloatingFloor);

            this.physics.add.collider(this.hitNextLevel, this.platforms);
            this.physics.add.collider(this.hitNextLevel, this.fixedFloatingFloor);
                
            this.physics.add.collider(this.princess, this.monster, this.hitMonster, null, this);
            this.physics.add.collider(this.princess, this.fire, this.hitMonster, null, this);
    
            //collision is going to level 2
            this.physics.add.collider(this.princess, this.hitNextLevel, this.youWin, null, this);
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
    
        leftFloatingPlatformMovement(){
            //Create Moving Platform
            if (this.leftFixedFloatingFloor.x >= 320)
            {
                this.leftFixedFloatingFloor.setVelocityX(-50);
            }
            else if (this.leftFixedFloatingFloor.x <= 250)
            {
                this.leftFixedFloatingFloor.setVelocityX(50);
            }
        }

        rightFloatingPlatformMovement(){
            //Create Moving Platform
            if (this.rightFixedFloatingFloor.x >= 600)
            {
                this.rightFixedFloatingFloor.setVelocityX(-50);
            }
            else if (this.rightFixedFloatingFloor.x <= 500)
            {
                this.rightFixedFloatingFloor.setVelocityX(50);
            }
        }
    
        monsterMovement(){
            //Create Moving Monster
            // this.monster.setVelocityX(50);
            if (this.monster.x >= 780)
            {
                this.monster.setVelocityX(-75);
            }
            else if (this.monster.x <= 670)
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
    
        youWin(){
            this.scene.start(`youWin`);
        }


    }