// "use strict";

import Boot from "./scenes/Boot.js";
import LoadingScreen from "./scenes/LoadingScreen.js";
import FirstLevel from "./scenes/FirstLevel.js";
import SecondLevel from "./scenes/SecondLevel.js";

const config = {
    type: Phaser.AUTO,
    width: 800, 
    height: 600,
    physics: {
        default: `arcade`,
        arcade: {
            debug: true,
            gravity: {y:300}
        }
    },
    scene: [Boot, LoadingScreen, FirstLevel, SecondLevel]
}

let game = new Phaser.Game(config);