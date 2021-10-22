export const addBg = (bg) => {
  bg.add.image(400, 300, `bg`).setScale(1).setOrigin(0.5);
}

export const levelText = (text, level) => {
  text.add.text(20, 20, `level ${level}`, { fontSize: `16px`, fill: `#ffff` })
}


