export function playLetter(letter: string) {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/letters/${letter}.mp3`);
  audio.play();
}

export function playWord(word: string) {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/words/${word}.mp3`);
  audio.play();
}

export function playSuccessSound() {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/efects/BONUS.mp3`);
  audio.play();
}

export function playErrorSound() {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/efects/ERROR.mp3`);
  audio.play();
}
