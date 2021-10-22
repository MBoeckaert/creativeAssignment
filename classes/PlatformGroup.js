export default class PlatformGroup extends Phaser.Physics.Arcade.StaticGroup {
    constructor(scene) {
        // Call the super constructor, passing in a world and a scene
        super(scene.physics.world, scene);
        // Initialize the group
        this.createMultiple({
            classType: Platform, // class created just below
            active: false,
            visible: false,
            key: 'floor'
        })
        const amountOfFloor = 5;
        for (let i = 0; i < amountOfFloor; i++) {
            this.create(128 + (i * 256), 590);
        }
        // this.remove(child[0]);

    }
}

class Platform extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, "floor");
        // this.create(this, 250, 250);
        this.setScale(2);
    }
}