import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import TesterInterface from './components/TesterInterface';

function App() {
  const [showTester, setShowTester] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden font-sans selection:bg-blue-500/30">
      <AnimatePresence mode="wait">
        {!showTester ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStart={() => setShowTester(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="tester"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TesterInterface onBack={() => setShowTester(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global Footer */}
      <footer className="w-full py-8 px-4 border-t border-zinc-900 bg-black text-center">
        <p className="text-zinc-600 text-sm">
          Built for developers. No data storage. Open source.
        </p>
      </footer>
    </div>
  );
}

export default App;
