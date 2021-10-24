export const addBg = (bg) => {
  bg.add.image(400, 300, `bg`).setScale(1).setOrigin(0.5);
}

export const levelText = (text, level) => {
  text.add.text(20, 20, `level ${level}`, { fontSize: `16px`, fill: `#ffff` });
}

// export const playerControls = (scene) => {
//   //4. get keyboard input
//   let cursors = scene.input.keyboard.createCursorKeys();

  //key Left, right, up, down
  // let keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  // let keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  // let keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  // let keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

//   return cursors, keyA, keyE, keyZ, keyS;
// }

// export const playerMovement = (scene) => {
//   //create Player Movement
//   if (scene.cursors.left.isDown || scene.keyA.isDown) {
//     scene.princess.setVelocityX(-100);
//     scene.princess.flipX = true;
//   }
//   else if (scene.cursors.right.isDown || scene.keyE.isDown) {
//     scene.princess.setVelocityX(100);
//     scene.princess.flipX = false;
//   } else {
//     scene.princess.setVelocityX(0);

//   }

//   if ((scene.cursors.up.isDown && scene.princess.body.touching.down) || (scene.keyZ.isDown && scene.princess.body.touching.down)) {
//     scene.princess.setVelocityY(-245);
//   }
// }
