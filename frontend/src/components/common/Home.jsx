import React from 'react';

const Home = ({ setActiveTab, onOpenLogin, onOpenSignup }) => {
  const features = [
    {
      title: "Early Detection",
      description: "AI-powered risk assessment to identify potential PCOS/PCOD before symptoms worsen.",
      icon: "🔍",
      color: "neon-purple"
    },
    {
      title: "Period Tracking",
      description: "Monitor your cycle, symptoms, and identify irregular patterns with smart insights.",
      icon: "📅",
      color: "neon-pink"
    },
    {
      title: "Lifestyle Recommendations",
      description: "Get personalized diet, exercise, and wellness plans tailored to your unique profile.",
      icon: "🥗",
      color: "aqua-blue"
    },
    {
      title: "Mental Health Support",
      description: "Access tools for stress management, mood tracking, and guided meditation sessions.",
      icon: "🧠",
      color: "neon-purple"
    },
    {
      title: "Doctor Finder",
      description: "Locate specialists near you for consultations and professional medical advice.",
      icon: "👩‍⚕️",
      color: "neon-pink"
    },
    {
      title: "Community Support",
      description: "Connect with others, share experiences, and access educational resources.",
      icon: "👭",
      color: "aqua-blue"
    }
  ];

  return (
    <div className="w-[94%] max-w-7xl min-h-[80vh] mx-auto flex flex-col items-center py-12">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden rounded-[32px] glass-card mb-16 p-8 md:p-16">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          {/* Brand + Copy */}
          <div className="flex-[1.2] text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-400 text-sm font-bold uppercase tracking-widest">Next-Gen AI Diagnostics</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
              Empowering Women’s <span className="text-teal-400">Wellness.</span>
            </h1>
            
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl lg:max-w-none mb-10 leading-relaxed">
              AuraHealth combines advanced clinical intelligence with compassionate care to provide 
              early detection, smart tracking, and personalized wellness plans for PCOS and PCOD.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setActiveTab('early-detection')}
                className="aura-button px-10 py-4 text-lg"
              >
                Assess My Risk <span className="text-xl">→</span>
              </button>
              <button
                onClick={() => setActiveTab('tracker')}
                className="aura-button-outline px-10 py-4 text-lg"
              >
                Launch Tracker
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start opacity-70">
              {[
                { label: "Clinical Grade AI", icon: "🛡️" },
                { label: "Privacy Encrypted", icon: "🔒" },
                { label: "Specialist Network", icon: "🌐" }
              ].map((badge, bidx) => (
                <div key={bidx} className="flex items-center gap-2 text-sm text-slate-300">
                  <span>{badge.icon}</span>
                  <span className="font-medium tracking-wide">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Accent - Replaced neon box with a more professional clinical preview */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="aura-card border-teal-500/30 bg-slate-800/50 backdrop-blur-xl relative group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-400/50" />
                </div>
                <span className="text-xs font-mono text-teal-400/50">DIAGNOSTIC_ANALYSIS_V2.0</span>
              </div>
              
              <div className="space-y-6">
                <div className="h-2 w-3/4 bg-slate-700/50 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-teal-400/50 animate-[shimmer_2s_infinite]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-slate-700/30 rounded-2xl border border-slate-700/50" />
                  <div className="h-20 bg-slate-700/30 rounded-2xl border border-slate-700/50" />
                </div>
                <div className="h-32 bg-teal-500/5 rounded-2xl border border-teal-500/20 flex items-center justify-center">
                  <span className="text-teal-400/40 text-sm font-medium">Predictive Modeling Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full mb-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-2">Diagnostic Suite</h2>
        <div className="w-20 h-1 bg-teal-500 rounded-full mb-12" />
        
        <div className="dashboard-grid w-full">
          {features.map((feature, idx) => (
            <div key={idx} className="aura-card hover:translate-y-[-8px] transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-slate-700/50 flex items-center justify-center text-3xl mb-6 group-hover:bg-teal-500/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed mb-6">{feature.description}</p>
              <button 
                onClick={() => setActiveTab(idx === 0 ? 'early-detection' : idx === 1 ? 'tracker' : idx === 4 ? 'resources' : idx === 5 ? 'community' : 'home')}
                className="text-sm font-bold text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-2 group/btn"
              >
                Access Tool <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full glass-card p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-pink/5 blur-[80px] rounded-full" />
        <h2 className="text-3xl font-bold text-white mb-6">Proactive Health Management</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          The AuraHealth ecosystem is built on the latest clinical datasets and ultrasound imaging analysis 
          to provide you with a comprehensive risk profile, long before symptoms manifest.
        </p>
        <button
          onClick={() => setActiveTab('early-detection')}
          className="aura-button mx-auto"
        >
          Initialize AI Analysis
        </button>
      </div>
    </div>
  );
};

export default Home;