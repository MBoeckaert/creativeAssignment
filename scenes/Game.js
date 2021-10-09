

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }


    create(){
        //1. add assets from Boot
        this.bg = this.add.image(400,300, `bg`);
            //set floor platform
            //make floor a platform and repeat it over screen
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(50, 568, 'floor').setScale(2).refreshBody();
            //Make a movable platform
        this.floatingFloor = this.physics.add.image(500,450, `floatingFloor`);
        this.floatingFloor.setImmovable(true);
        this.floatingFloor.body.allowGravity = false;
        this.floatingFloor.setVelocityX(50);

        this.fire = this.add.image(450, 590, `fire`);
        this.princess = this.physics.add.sprite(50, 400, `princess`);  
        this.princess.setScale(0.5);
        this.monster = this.physics.add.sprite(500, 400, `monster`);

        //2. colliding interactions
        this.physics.add.collider(this.princess, this.platforms);
        this.physics.add.collider(this.princess, this.floatingFloor);

        //3. physics methods
        this.princess.setVelocity(100,200);
        this.princess.setBounce(0.2);
        this.princess.setCollideWorldBounds(true);
        this.monster.setCollideWorldBounds(true);

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

    update(){
        //create Player Movement
        this.princess.setVelocity(0, 500);

        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.princess.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown || this.keyE.isDown)
        {
            this.princess.setVelocityX(200);
        }

        if (this.cursors.up.isDown || this.keyZ.isDown)
        {
            this.princess.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.princess.setVelocityY(200);
        }

        //Create Moving Platform
        if (this.floatingFloor.x >= 500)
        {
            this.floatingFloor.setVelocityX(-50);
        }
        else if (this.floatingFloor.x <= 400)
        {
            this.floatingFloor.setVelocityX(50);
        }
    }

}