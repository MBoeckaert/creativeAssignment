

export default class Game extends Phaser.Scene {
    constructor(){
        super({
            key: `play`
        });
    }


    create(){
        // this.bg = this.add.image(400,300, `bg`);
        // this.bg.setOrigin(0.5, 0.5);
        // this.bg.setScale(0.331);

        this.princess = this.add.sprite(200, 200, `princess`);
        this.princess.setScale(0.1);

    }

    update(){
        console.log(`updated!`);
    }

}