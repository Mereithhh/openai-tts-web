import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TTSSettings as TTSSettingsType } from '../types/tts';
import { loadSettings, saveSettings } from '../services/storage';
import { getSystemVoices } from '../services/tts';

export function TTSSettings() {
  const [settings, setSettings] = useState<TTSSettingsType>(loadSettings());
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    getSystemVoices().then(setSystemVoices);
  }, []);

  const handleSave = () => {
    try {
      saveSettings(settings);
      toast({
        title: '成功',
        description: '设置已保存',
      });
    } catch (error) {
      toast({
        title: '错误',
        description: '保存设置失败',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>TTS 设置</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">OpenAI TTS</h3>
          <div className="space-y-2">
            <Label htmlFor="openai-api-key">API Key</Label>
            <Input
              id="openai-api-key"
              type="password"
              value={settings.openai.apiKey}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                openai: { ...prev.openai, apiKey: e.target.value }
              }))}
              placeholder="sk-..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openai-base-url">API 代理地址</Label>
            <Input
              id="openai-base-url"
              type="text"
              value={settings.openai.baseUrl}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                openai: { ...prev.openai, baseUrl: e.target.value }
              }))}
              placeholder="https://api.openai.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="openai-model">模型</Label>
            <Select
              value={settings.openai.model}
              onValueChange={(value) => setSettings(prev => ({
                ...prev,
                openai: { ...prev.openai, model: value }
              }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择模型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tts-1">TTS-1</SelectItem>
                <SelectItem value="tts-1-hd">TTS-1-HD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="openai-voice">声音</Label>
            <Select
              value={settings.openai.voice}
              onValueChange={(value) => setSettings(prev => ({
                ...prev,
                openai: { ...prev.openai, voice: value }
              }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择声音" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alloy">Alloy</SelectItem>
                <SelectItem value="echo">Echo</SelectItem>
                <SelectItem value="fable">Fable</SelectItem>
                <SelectItem value="onyx">Onyx</SelectItem>
                <SelectItem value="nova">Nova</SelectItem>
                <SelectItem value="shimmer">Shimmer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">系统 TTS</h3>
          <div className="space-y-2">
            <Label htmlFor="system-voice">声音</Label>
            <Select
              value={settings.system.voice}
              onValueChange={(value) => setSettings(prev => ({
                ...prev,
                system: { ...prev.system, voice: value }
              }))}>
              <SelectTrigger>
                <SelectValue placeholder="选择声音" />
              </SelectTrigger>
              <SelectContent>
                {systemVoices.map((voice) => (
                  <SelectItem key={voice.name} value={voice.name}>
                    {voice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            保存设置
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 