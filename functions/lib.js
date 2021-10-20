export const addBg = (bg) => {
  bg.add.image(400,300, `bg`).setScale(1).setOrigin(0.5); 
}

export const levelText = (text, level) =>{
  text.add.text(20, 20, `level ${level}`, {fontSize: `16px`, fill: `#ffff`})
}

export const platform = (platform, xPos, yPos) => {
  const ground = platform.physics.add.staticGroup();
  ground.create(xPos, yPos, `floor`);
}

// export const mainChar = (mainChar, xPos, yPos) => {
//   const princess = mainChar.physics.add.sprite(xPos, yPos, `princess`);
//   princess.setScale(0.3);
//   princess.setBounce(0.2);
//   princess.setCollideWorldBounds(true);
// }
