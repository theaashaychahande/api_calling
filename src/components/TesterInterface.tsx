import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Key, Cpu, Trash2, ArrowLeft, Loader2 } from 'lucide-react';
import { type Message, type Provider, callApi } from '../api';

interface TesterInterfaceProps {
  onBack: () => void;
}

const TesterInterface = ({ onBack }: TesterInterfaceProps) => {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState<Provider>('OpenAI');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!apiKey) {
      setMessages(prev => [...prev, { role: 'assistant', content: '🚨 Error: Please provide an API key first.' }]);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callApi(provider, apiKey, [...messages, userMessage]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: error.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col items-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-4xl flex items-center justify-between mb-8"
      >
        <button
          onClick={onBack}
          className="flex items-center text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          API Tester Interface
        </h2>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Terminal className="w-5 h-5 text-blue-500" />
        </div>
      </motion.div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow h-[70vh]">
        {/* Sidebar Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-1 space-y-6"
        >
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
            <label className="flex items-center text-sm font-medium text-zinc-400 mb-2">
              <Key className="w-4 h-4 mr-2" /> API KEY
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your key here..."
              className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
            <label className="flex items-center text-sm font-medium text-zinc-400 mb-2">
              <Cpu className="w-4 h-4 mr-2" /> PROVIDER
            </label>
            <div className="grid grid-cols-1 gap-2">
              {(['OpenAI', 'OpenRouter', 'Gemini'] as Provider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  className={`px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                    provider === p
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-black border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={clearChat}
            className="w-full flex items-center justify-center px-4 py-3 rounded-xl border border-red-900/30 bg-red-900/10 text-red-400 hover:bg-red-900/20 transition-all text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Clear History
          </button>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 flex flex-col rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden relative backdrop-blur-md"
        >
          <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex justify-between items-center z-10">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Live Terminal</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-6 space-y-4 scroll-smooth"
          >
            {messages.length === 0 && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                <Terminal className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-sm font-mono italic">Awaiting API command...</p>
              </div>
            )}
            
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-700'
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-zinc-800 p-4 rounded-2xl rounded-tl-none border border-zinc-700 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-sm text-zinc-400 font-mono">Processing...</span>
                </div>
              </motion.div>
            )}
          </div>

          <div className="p-4 bg-zinc-900/80 border-t border-zinc-800">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="w-full bg-black border border-zinc-800 rounded-xl px-6 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all pr-14 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:bg-zinc-800 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/10"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TesterInterface;
