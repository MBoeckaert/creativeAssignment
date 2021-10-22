export const addBg = (bg) => {
  bg.add.image(400, 300, `bg`).setScale(1).setOrigin(0.5);
}

export const levelText = (text, level) => {
  text.add.text(20, 20, `level ${level}`, { fontSize: `16px`, fill: `#ffff` })
}

export const gameText = (text, xPos, yPos, message) => {
  let gameText = text.add.text(xPos, yPos, `${message}`, { fontSize: `32px`, fill: `#ffff` }).setOrigin(0.5);
  return gameText;
}

export const platform = (platform, xPos, yPos) => {
  const ground = platform.physics.add.staticGroup();
  ground.create(xPos, yPos, `floor`).setScale(2).refreshBody();
}

export const collidingInteractions = (collideInteractions, firstAssets, secondAsset) => {
  const collide = collideInteractions.physics.add.collider(firstAssets, secondAsset);
}

// export const floatingPlatformMovement = (scene, floatingPlatform) => {
//   //Create Moving Platform
//   if (scene.floatingPlatform.x >= 370) {
//     scene.floatingPlatform.setVelocityX(-50);
//   }
//   else if (scene.floatingPlatform.x <= 300) {
//     scene.floatingPlatform.setVelocityX(50);
//   }
// }