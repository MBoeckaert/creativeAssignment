export default class FireGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        // Call the super constructor, passing in a world and a scene
        super(scene.physics.world, scene);
        // Initialize the group
        this.createMultiple({
            classType: Fire, // class created just below
            active: false,
            visible: false,
            key: 'fire'
        })
        const amountOfFire = 4;
        for (let i = 0; i < amountOfFire; i++) {
            this.create(276 + (i * 40), 590, `fire`);
        }
    }
}

class Fire extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "fire");
    }
}