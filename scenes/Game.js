

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }


    create(){
        //add assets from Boot
        this.bg = this.add.image(400,300, `bg`);
        //set floor platform
        // this.floor = this.add.image(50,590, `floor`);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(60, 590, `floor`).setScale(2).refreshBody();
        //make floor a platform and repeat it over screen
        this.floatingFloor = this.add.image(650,450, `floatingFloor`);
        this.fire = this.add.image(450, 590, `fire`);
        this.princess = this.physics.add.sprite(50, 400, `princess`);  this.princess.setScale(0.5);
        this.monster = this.physics.add.sprite(500, 400, `monster`);

        //physics methods
        this.princess.setVelocity(100,200);
        this.princess.setCollideWorldBounds(true);
        this.monster.setCollideWorldBounds(true);

        //get keyboard input
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
        //create Movement
        this.princess.setVelocity(0);

        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.princess.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown || this.keyE.isDown)
        {
            this.princess.setVelocityX(300);
        }

        if (this.cursors.up.isDown || this.keyZ.isDown)
        {
            this.princess.setVelocityY(-300);
        }
        else if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.princess.setVelocityY(300);
        }
    }

}