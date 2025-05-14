export class AudioManager {
  private static getAudioPath(type: 'success' | 'error' | 'letter' | 'word', value?: string): string {
    switch (type) {
      case 'success':
        return `${process.env.PUBLIC_URL}/audio/efects/BONUS.mp3`;
      case 'error':
        return `${process.env.PUBLIC_URL}/audio/efects/ERROR.mp3`;
      case 'letter':
        return `${process.env.PUBLIC_URL}/audio/letters/${value}.mp3`;
      case 'word':
        return `${process.env.PUBLIC_URL}/audio/words/${value}.mp3`;
      default:
        throw new Error(`Tipo de audio no soportado: ${type}`);
    }
  }

  static playSound(type: 'success' | 'error' | 'letter' | 'word', value?: string) {
    try {
      const audioPath = this.getAudioPath(type, value);
      const audio = new Audio(audioPath);
      audio.play().catch(error => {
        console.error(`Error reproduciendo audio ${type}:`, error);
      });
    } catch (error) {
      console.error('Error en AudioManager:', error);
    }
  }
}