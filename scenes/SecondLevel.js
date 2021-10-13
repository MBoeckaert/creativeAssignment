    //Look this up for startFollow
    //https://labs.phaser.io/edit.html?src=src/camera/follow%20zoom%20tilemap.js&v=3.55.2

    //moving bg
    //https://phaser.io/examples/v3/view/camera/set-bounds

    export default class FirstLevel extends Phaser.Scene {
        constructor(){
            super({
                key: `level2`
            });
        }

        create(){
            this.bg = this.add.image(0,0, `bg`);
            Phaser.Display.Align.In.Center(this.bg, this.add.zone(400, 300, 800, 600));
        }
    }