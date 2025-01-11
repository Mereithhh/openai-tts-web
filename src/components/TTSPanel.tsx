import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TTSProvider, TTSState, TTSSettings } from '../types/tts';
import { synthesizeOpenAI, synthesizeSystem, getSystemVoices } from '../services/tts';
import { loadSettings } from '../services/storage';

export function TTSPanel() {
  const [text, setText] = useState('');
  const [provider, setProvider] = useState<TTSProvider>('openai');
  const [state, setState] = useState<TTSState>({
    text: '',
    isLoading: false,
    error: null,
    audioUrl: null,
    autoPlay: true,
  });
  const [settings, setSettings] = useState<TTSSettings>(loadSettings());
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { toast } = useToast();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    getSystemVoices().then(setSystemVoices);
  }, []);

  useEffect(() => {
    if (state.audioUrl && state.autoPlay && audioRef.current) {
      audioRef.current.play().catch(error => {
        toast({
          title: '错误',
          description: '自动播放失败，请手动点击播放',
          variant: 'destructive',
        });
      });
    }
  }, [state.audioUrl, state.autoPlay]);

  const handleSubmit = async () => {
    if (!text.trim()) {
      toast({
        title: '错误',
        description: '请输入要转换的文本',
        variant: 'destructive',
      });
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      if (provider === 'openai') {
        if (!settings.openai.apiKey) {
          throw new Error('请先配置 OpenAI API Key');
        }
        const blob = await synthesizeOpenAI(text, {
          provider: 'openai',
          apiKey: settings.openai.apiKey,
          model: settings.openai.model,
          voice: settings.openai.voice,
          baseUrl: settings.openai.baseUrl,
        });
        const url = URL.createObjectURL(blob);
        setState(prev => ({ ...prev, audioUrl: url }));
      } else {
        await synthesizeSystem(text, {
          provider: 'system',
          voice: settings.system.voice,
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : '未知错误',
      }));
      toast({
        title: '错误',
        description: error instanceof Error ? error.message : '未知错误',
        variant: 'destructive',
      });
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>语音合成</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Select value={provider} onValueChange={(value: TTSProvider) => setProvider(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择 TTS 来源" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI TTS</SelectItem>
              <SelectItem value="system">系统 TTS</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch
              id="auto-play"
              checked={state.autoPlay}
              onCheckedChange={(checked) => setState(prev => ({ ...prev, autoPlay: checked }))}
            />
            <Label htmlFor="auto-play">自动播放</Label>
          </div>
        </div>

        <Textarea
          placeholder="请输入要转换的文本..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px]"
        />

        <div className="flex justify-end space-x-4">
          <Button
            onClick={handleSubmit}
            disabled={state.isLoading}
          >
            {state.isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            转换为语音
          </Button>
        </div>

        {state.audioUrl && (
          <audio
            ref={audioRef}
            controls
            src={state.audioUrl}
            className="w-full mt-4"
          />
        )}
      </CardContent>
    </Card>
  );
} 