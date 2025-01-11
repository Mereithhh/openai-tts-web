export type TTSProvider = 'openai' | 'system';

export interface TTSConfig {
  provider: TTSProvider;
  apiKey?: string;
  voice?: string;
  model?: string;
  baseUrl?: string;
}

export interface TTSState {
  text: string;
  isLoading: boolean;
  error: string | null;
  audioUrl: string | null;
  autoPlay: boolean;
}

export interface TTSSettings {
  openai: {
    apiKey: string;
    model: string;
    voice: string;
    baseUrl: string;
  };
  system: {
    voice: string;
  };
} 