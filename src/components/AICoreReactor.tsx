import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X, Zap, AlertTriangle, CheckCircle2, ArrowDown } from 'lucide-react';

const REQUIRED_PATH = ['Python', 'LangGraph', 'Gemini', 'Vector DB', 'AWS', 'Deployment'];
const ALL_NODES = [
  'Python', 'LangGraph', 'Gemini', 'Vector DB', 'AWS', 'Deployment',
  'React', 'TypeScript', 'TailwindCSS', 'Docker', 'Flask', 'PyTorch',
  'ChromaDB', 'REST API', 'SQL'
];

export default function AICoreReactor() {
  const [isOpen, setIsOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [activePath, setActivePath] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [isStabilized, setIsStabilized] = useState(false);
  
  // Scramble nodes for the left pool
  const [availablePool, setAvailablePool] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setAvailablePool([...ALL_NODES].sort(() => Math.random() - 0.5));
      setShowIntro(true);
      setActivePath([]);
      setIsStabilized(false);
      setIsCoolingDown(false);
    }
  }, [isOpen]);

  const handleNodeSelect = (node: string) => {
    if (isStabilized || isGlitching || isCoolingDown || showIntro) return;

    const nextRequiredNode = REQUIRED_PATH[activePath.length];
    
    if (node === nextRequiredNode) {
      const newPath = [...activePath, node];
      setActivePath(newPath);
      
      if (newPath.length === REQUIRED_PATH.length) {
        setIsCoolingDown(true);
        setTimeout(() => {
          setIsCoolingDown(false);
          setIsStabilized(true);
        }, 3000);
      }
    } else {
      // Wrong node! Glitch and reset
      setIsGlitching(true);
      setTimeout(() => {
        setActivePath([]);
        setIsGlitching(false);
      }, 800);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
            className={`fixed inset-4 sm:inset-10 z-50 liquid-glass rounded-3xl overflow-hidden border ${
              isStabilized ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.3)] bg-green-950/10' : 
              isCoolingDown ? 'border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-blue-950/10' :
              isGlitching ? 'border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.5)] bg-red-950/20' : 
              'border-red-500/30 bg-red-950/5'
            } flex flex-col`}
          >
            {/* Header */}
            <div className="p-4 border-b border-border/20 flex items-center justify-between bg-foreground/5 z-20 relative">
              <div className="flex items-center gap-3">
                <Cpu className={`w-5 h-5 ${isStabilized ? 'text-green-400' : isCoolingDown ? 'text-blue-400' : 'text-red-500 animate-pulse'}`} />
                <h3 className="font-bold">AI Core Reactor</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold uppercase tracking-wider ${
                  isStabilized ? 'bg-green-500/20 text-green-400' : 
                  isCoolingDown ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-red-500/20 text-red-500'
                }`}>
                  {isStabilized ? 'Stable' : isCoolingDown ? 'Cooling Down' : 'Critical Failure'}
                </span>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-foreground/10 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Intro Modal Overlay */}
            <AnimatePresence>
              {showIntro && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-md"
                >
                  <div className="liquid-glass border border-red-500/50 p-8 rounded-2xl max-w-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.3)] bg-red-950/20">
                    <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
                    <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase tracking-widest">CRITICAL ALERT</h2>
                    <p className="text-lg mb-4 text-foreground/90 font-semibold">
                      The AI system has crashed and it needs your help immediately!
                    </p>
                    <p className="text-muted-foreground mb-8">
                      You are an AI Engineer. The system wants you to develop a proper workflow to build an AI System. Place the skills in the correct sequence to stabilize the core.
                    </p>
                    <button 
                      onClick={() => setShowIntro(false)}
                      className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors w-full uppercase tracking-wider"
                    >
                      Initiate Manual Override
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Layout: Split View */}
            <div className="flex-1 flex flex-col md:flex-row relative z-10 overflow-hidden">
              
              {/* Left Side: Available Skills */}
              <div className="flex-1 p-6 overflow-y-auto border-r border-border/10">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Available Modules</h4>
                <div className="flex flex-wrap gap-3">
                  {availablePool.map((skill) => {
                    const isUsed = activePath.includes(skill);
                    return (
                      <motion.button
                        key={skill}
                        onClick={() => handleNodeSelect(skill)}
                        disabled={isUsed || showIntro || isStabilized || isGlitching || isCoolingDown}
                        className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all duration-300 ${
                          isUsed ? 'opacity-30 scale-95 border-primary/20 bg-background/20 cursor-not-allowed' :
                          'bg-background/40 border-primary/30 text-foreground hover:border-primary hover:bg-primary/20 shadow-lg cursor-pointer'
                        }`}
                        whileHover={!isUsed ? { scale: 1.05 } : {}}
                        whileTap={!isUsed ? { scale: 0.95 } : {}}
                      >
                        {skill}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Right Side: Flowchart Canvas */}
              <motion.div 
                className="flex-[1.5] bg-black/20 p-6 relative flex flex-col items-center justify-start overflow-y-auto"
                animate={isGlitching ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8 text-center w-full">System Workflow Canvas</h4>
                
                <div className="w-full max-w-sm flex flex-col items-center gap-0 pb-28">
                  <AnimatePresence>
                    {activePath.map((node, index) => (
                      <motion.div 
                        key={node}
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        className="flex flex-col items-center w-full"
                      >
                        {/* Node Card */}
                        <div className={`w-full py-4 px-6 rounded-xl border text-center font-bold text-lg shadow-xl backdrop-blur-md transition-colors duration-500 ${
                          isStabilized ? 'bg-green-500/20 border-green-400 text-green-300 shadow-[0_0_20px_rgba(34,197,94,0.4)]' :
                          isCoolingDown ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.4)]' :
                          'bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]'
                        }`}>
                          {node}
                        </div>
                        
                        {/* Connecting Line (unless it's the last one) */}
                        {index < REQUIRED_PATH.length - 1 && activePath.length > index + 1 && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 40, opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="flex flex-col items-center my-2"
                          >
                            <div className={`w-1 h-10 ${isStabilized ? 'bg-green-400' : isCoolingDown ? 'bg-blue-400' : 'bg-primary'} rounded-full`} />
                            <ArrowDown className={`w-5 h-5 -mt-3 ${isStabilized ? 'text-green-400' : isCoolingDown ? 'text-blue-400' : 'text-primary'}`} />
                          </motion.div>
                        )}
                        
                        {/* Empty connector waiting for next node */}
                        {index === activePath.length - 1 && index < REQUIRED_PATH.length - 1 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center my-2 animate-pulse"
                          >
                            <div className="w-1 h-10 bg-primary/30 rounded-full border-dashed border-r border-l border-primary/50" />
                            <ArrowDown className="w-5 h-5 -mt-3 text-primary/50" />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty State placeholder */}
                  {activePath.length === 0 && !showIntro && (
                    <div className="w-full py-12 px-6 rounded-xl border border-dashed border-muted-foreground/30 text-center flex flex-col items-center justify-center opacity-50">
                      <Cpu className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground font-medium">Select a module from the left to start building the workflow</p>
                    </div>
                  )}
                </div>

                {/* Status Overlays */}
                <div className="absolute bottom-8 left-0 right-0 px-6 pointer-events-none flex justify-center">
                  <AnimatePresence>
                    {isStabilized && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="liquid-glass px-8 py-4 rounded-full border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)] text-center bg-green-950/40 backdrop-blur-xl"
                      >
                        <p className="text-green-400 font-bold tracking-widest uppercase text-lg">Finally AI system is Stable</p>
                        <p className="text-xs text-green-200 mt-1">Excellent work, Engineer.</p>
                      </motion.div>
                    )}
                    {isCoolingDown && !isStabilized && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="liquid-glass px-8 py-4 rounded-full border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.4)] text-center bg-blue-950/40 backdrop-blur-xl"
                      >
                        <p className="text-blue-400 font-bold tracking-widest uppercase text-lg animate-pulse">The AI core System is cooling down...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full liquid-glass flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)] border border-red-500/30 relative"
      >
        <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md animate-pulse" />
        {isOpen ? <X className="w-6 h-6 text-foreground relative z-10" /> : <Zap className="w-6 h-6 text-red-500 relative z-10" />}
      </motion.button>
    </div>
  );
}
