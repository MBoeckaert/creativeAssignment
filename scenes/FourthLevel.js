import {addBg, levelText} from "../functions/lib.js";
import MainCharacter from "./classes/MainCharacter.js";

export default class FourthLevel extends Phaser.Scene {
    constructor(){
        super({
            key: `level4`
        });
    }

    create(){
        addBg(this);
        // addPrincess(this);
        levelText(this, 4);
        // platform(this, 128, 590);
        // mainChar(this, 200, 500);
        let princess = new MainCharacter({scene:this,x:100,y:100/2});
        // princess.setScale(0.5);
    }
}

