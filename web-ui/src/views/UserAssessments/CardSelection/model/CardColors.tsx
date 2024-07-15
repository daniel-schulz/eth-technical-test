export enum CardColors {
  RED = "red",
  GREEN = "green",
  YELLOW = "orange",
}

export function getRandomCardColor(): CardColors {
  const colors = [CardColors.RED, CardColors.GREEN, CardColors.YELLOW];
  return colors[Math.floor(Math.random() * colors.length)];
};

