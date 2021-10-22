import { addBg, levelText } from "../functions/lib.js";
import MainCharacter from "./classes/MainCharacter.js";
import Platform from "./classes/Platform.js";

export default class FourthLevel extends Phaser.Scene {
    constructor() {
        super({
            key: `level4`
        });
    }

    create() {
        addBg(this);
        levelText(this, 4);
        let princess = new MainCharacter({ scene: this, x: 100, y: 500 });
        let platform = new Platform({ scene: this, x: 128, y: 590 });

    }
}

