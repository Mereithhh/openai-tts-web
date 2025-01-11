import { TTSConfig } from '../types/tts';

export async function synthesizeOpenAI(text: string, config: TTSConfig): Promise<Blob> {
  const baseUrl = config.baseUrl || 'https://api.openai.com';
  const response = await fetch(`${baseUrl}/v1/audio/speech`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'tts-1',
      input: text,
      voice: config.voice || 'alloy',
    }),
    redirect: 'follow',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'OpenAI TTS 合成失败');
  }

  return response.blob();
}

export function synthesizeSystem(text: string, config: TTSConfig): Promise<SpeechSynthesisUtterance> {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);

    if (config.voice) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === config.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    utterance.onend = () => resolve(utterance);
    utterance.onerror = (event) => reject(new Error('系统 TTS 合成失败'));

    window.speechSynthesis.speak(utterance);
  });
}

export function getSystemVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices());
      };
    }
  });
} 