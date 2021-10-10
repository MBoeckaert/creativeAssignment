

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }

    //add sound
    //https://www.epidemicsound.com/music/genres/video-games/

    create(){
        //1. add assets from Boot
        this.bg = this.add.image(0,0, `bg`);
        Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
            //set floor platforms
            this.platforms = this.physics.add.staticGroup();
            this.platforms.create(128, 590, 'floor').setScale(2).refreshBody(); //refreshBody() doesn't work
            this.platforms.create(544, 590, `floor`).setScale(2).refreshBody();
            this.platforms.create(800, 590, `floor`).setScale(2).refreshBody();
            // for(let x = 0; x < 4; x++){
            //     this.platforms.create( x * 128, 560, `floor`).setScale(2).setOrigin(0);
            // }
            //Make a movable platform
            this.floatingFloor = this.physics.add.image(250,475, `floatingFloor`);
            this.floatingFloor.setImmovable(true);
            this.floatingFloor.body.allowGravity = false;
            this.floatingFloor.setVelocityX(50);
            //fire
        this.fire = this.add.image(276, 590, `fire`);
        this.fire = this.add.image(316, 590, `fire`);
        this.fire = this.add.image(356, 590, `fire`);
        this.fire = this.add.image(396, 590, `fire`);
            //princess
        this.princess = this.physics.add.sprite(50, 400, `princess`); 
        this.princess.setBounce(0.2) ;
        this.princess.setScale(0.4);
            //monster
        this.monster = this.physics.add.sprite(680, 500, `monster`);

        //2. colliding interactions
        this.physics.add.collider(this.princess, this.platforms);
        this.physics.add.collider(this.princess, this.floatingFloor);
        this.physics.add.collider(this.monster, this.platforms);
            //need interactions between princess and monsters => game reset

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

        //Create Moving Platform
        if (this.floatingFloor.x >= 370)
        {
            this.floatingFloor.setVelocityX(-50);
        }
        else if (this.floatingFloor.x <= 300)
        {
            this.floatingFloor.setVelocityX(50);
        }

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

}