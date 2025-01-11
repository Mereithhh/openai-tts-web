import { TTSSettings } from '../types/tts';

const STORAGE_KEY = 'tts-settings';

export function saveSettings(settings: TTSSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function loadSettings(): TTSSettings {
  const defaultSettings: TTSSettings = {
    openai: {
      apiKey: '',
      model: 'tts-1',
      voice: 'alloy',
      baseUrl: 'https://api.openai.com',
    },
    system: {
      voice: '',
    },
  };

  const savedSettings = localStorage.getItem(STORAGE_KEY);
  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    const parsed = JSON.parse(savedSettings);
    return {
      openai: {
        ...defaultSettings.openai,
        ...parsed.openai,
      },
      system: {
        ...defaultSettings.system,
        ...parsed.system,
      },
    };
  } catch {
    return defaultSettings;
  }
} 