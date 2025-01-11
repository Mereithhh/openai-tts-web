import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TTSPanel } from './components/TTSPanel'
import { TTSSettings } from './components/TTSSettings'
import { Toaster } from '@/components/ui/toaster'

function App() {
  const [activeTab, setActiveTab] = useState('tts')

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col">
      <div className="container mx-auto flex-1">
        <h1 className="text-3xl font-bold mb-8 text-center">TTS 语音合成</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="tts">语音合成</TabsTrigger>
            <TabsTrigger value="settings">设置</TabsTrigger>
          </TabsList>
          <TabsContent value="tts">
            <TTSPanel />
          </TabsContent>
          <TabsContent value="settings">
            <TTSSettings />
          </TabsContent>
        </Tabs>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          By{' '}
          <a
            href="https://github.com/mereithhh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-4"
          >
            mereith
          </a>
          {' · '}
          <a
            href="https://github.com/mereithhh/openai-tts-web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary underline underline-offset-4"
          >
            GitHub
          </a>
        </p>
      </footer>
      <Toaster />
    </div>
  )
}

export default App
