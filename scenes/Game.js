

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }


    create(){
        //1. add assets from Boot
        this.bg = this.add.image(0,0, `bg`);
        Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
            //set floor platform
        this.platforms = this.physics.add.staticGroup();
            this.platforms.create(50, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
            //Make a movable platform
            this.floatingFloor = this.physics.add.image(250,500, `floatingFloor`);
            this.floatingFloor.setImmovable(true);
            this.floatingFloor.body.allowGravity = false;
            this.floatingFloor.setVelocityX(50);
            //fire
        this.fire = this.add.image(200, 590, `fire`);
            //princess
        this.princess = this.physics.add.sprite(50, 400, `princess`); 
        this.princess.setBounce(0.2) ;
        this.princess.setScale(0.5);
            //monster
        this.monster = this.physics.add.sprite(549, 500, `monster`);

        //2. colliding interactions
        this.physics.add.collider(this.princess, this.platforms);
        this.physics.add.collider(this.princess, this.floatingFloor);

        //3. physics methods
        // this.princess.setVelocity(100,200);
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
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.princess.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown || this.keyE.isDown)
        {
            this.princess.setVelocityX(160);
        }else{
            this.princess.setVelocityX(0);
        }

        if ((this.cursors.up.isDown && this.princess.body.touching.down) || (this.keyZ.isDown && this.princess.body.touching.down))
        {
            this.princess.setVelocityY(-225);
        }

        //Create Moving Platform
        if (this.floatingFloor.x >= 350)
        {
            this.floatingFloor.setVelocityX(-50);
        }
        else if (this.floatingFloor.x <= 250)
        {
            this.floatingFloor.setVelocityX(50);
        }

        //Create Moving Monster
        // this.monster.setVelocityX(50);
        if (this.monster.x >= 675)
        {
            this.monster.setVelocityX(-75);
        }
        else if (this.monster.x <= 550)
        {
            this.monster.setVelocityX(75);
        }
    }

}