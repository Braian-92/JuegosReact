export function playLetter(letter: string, basePath: string = '/audio/letters') {
  const audio = new Audio(`${basePath}/${letter.toUpperCase()}.mp3`);
  audio.play().catch(() => {});
}

export function playWord(word: string, basePath: string = '/audio/words') {
  const audio = new Audio(`${basePath}/${word.toUpperCase()}.mp3`);
  audio.play().catch(() => {});
}

export function playSuccessSound() {
  const audio = new Audio('/audio/efects/BONUS.mp3');
  audio.play().catch(() => {});
}

export function playErrorSound() {
  const audio = new Audio('/audio/efects/ERROR.mp3');
  audio.play().catch(() => {});
}
