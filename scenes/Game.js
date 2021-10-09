

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }


    create(){
        //add assets from Boot
        this.bg = this.add.image(400,300, `bg`);
        this.princess = this.physics.add.sprite(50, 400, `princess`);
        this.princess.setScale(0.5);

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

        //physics methods
        this.princess.setVelocity(100,200);
        this.princess.setCollideWorldBounds(true);
    }

    update(){
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