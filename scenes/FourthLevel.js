import { addBg, levelText } from "../functions/lib.js";
import MainCharacter from "../classes/MainCharacter.js";
import Platform from "../classes/Platform.js";
import Fire from "../classes/Fire.js";
import Monster from "../classes/Monster.js";
import SmallFloatingPlatform from "../classes/SmallFloatingPlatform.js";
import FloatingPlatform from "../classes/FloatingPlatform.js";

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
        let monster = new Monster({ scene: this, x: 128, y: 50 });
        let fire = new Fire({ scene: this, x: 128, y: 90 });
        let smallFloat = new SmallFloatingPlatform({ scene: this, x: 500, y: 290 });
        let floatingPlatform = new FloatingPlatform({ scene: this, x: 300, y: 590 });

    }
}

