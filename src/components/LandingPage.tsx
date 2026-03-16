import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-black text-white overflow-hidden relative">
      {/* Background blobs for eye-catching effect */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10 max-w-4xl"
      >
        <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
          The Ultimate API Validation Tool
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
          Verify Your AI API Keys <br /> with Confidence.
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Universal AI API Tester is a professional-grade tool to instantly validate OpenAI, OpenRouter, and Gemini API keys. Experience high-speed testing with a developer-first interface.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
          >
            Test Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-zinc-400 font-semibold hover:text-white transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 z-10 w-full max-w-5xl"
      >
        <FeatureCard
          icon={<Zap className="w-6 h-6 text-yellow-500" />}
          title="Instant Response"
          description="Sub-second verification for your API keys across all major providers."
        />
        <FeatureCard
          icon={<Shield className="w-6 h-6 text-green-500" />}
          title="Zero Storage"
          description="Your API keys are never stored. Everything happens in your browser."
        />
        <FeatureCard
          icon={<Globe className="w-6 h-6 text-blue-500" />}
          title="Universal Support"
          description="Native support for OpenAI, Gemini, and OpenRouter architectures."
        />
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm hover:border-zinc-700 transition-all duration-300 group">
    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-zinc-500 leading-relaxed">{description}</p>
  </div>
);

export default LandingPage;
