import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Bot, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string | string[];
};

const generateResponse = (input: string): string[] => {
  const query = input.toLowerCase();

  // Helper to match whole words using regex
  const hasWord = (words: string[]) => words.some(w => new RegExp(`\\b${w}\\b`).test(query));
  
  if (hasWord(['who', 'about', 'him', 'mounish', 'yourself', 'background'])) {
    return [
      "Mounish is an AI Engineer and Cloud-Native Developer.",
      "He's passionate about designing scalable cloud-native solutions and intelligent systems.",
      "He's proficient in developing AI-driven applications using AWS, LangChain, and LangGraph."
    ];
  }
  
  if (hasWord(['hi', 'hello', 'hey', 'greetings', 'sup'])) {
    return [
      "Hello, explorer.",
      "Welcome aboard.",
      "I'm Mounish's AI assistant.",
      "I can tell you about his projects, skills, experience, and contact details."
    ];
  }
  
  if (hasWord(['contact', 'email', 'phone', 'reach', 'number', 'hire'])) {
    return [
      "You can reach Mounish at:",
      "Email: bijjamulamounish2003@gmail.com",
      "Phone: +91 9182925547",
      "He's always open to interesting opportunities."
    ];
  }

  // Projects - specific
  if (hasWord(['rag', 'llm', 'generative', 'report', 'financial'])) {
    return [
      "Mounish developed an enterprise-grade Retrieval-Augmented Generation platform.",
      "It queries 350+ page financial reports using Flask, React, ChromaDB, Gemini, and BGE Embeddings.",
      "It's a production-ready AI tool that saves hours of manual document review."
    ];
  }
  
  if (hasWord(['agentic', 'stock', 'market'])) {
    return [
      "Mounish built an Agentic Stock Market Analysis system using LangGraph and Gemini APIs.",
      "It performs automated stock research, sentiment analysis, technical analysis, and portfolio recommendations."
    ];
  }
  
  if (hasWord(['college', 'management', 'multi-agent', 'assistant'])) {
    return [
      "He created a Multi-Agent College Management Assistant.",
      "It uses LangGraph, Streamlit, ChromaDB, and Ollama (Qwen2.5) to automate academic info retrieval."
    ];
  }
  
  if (hasWord(['heart', 'disease', 'medical'])) {
    return [
      "His Heart Disease Risk Classification app achieved 98% accuracy.",
      "He used an ensemble of PyTorch MLP, TabPFN, and Particle Swarm Optimization (PSO)."
    ];
  }
  
  if (hasWord(['deepfake', 'face', 'detection'])) {
    return [
      "He built a Deepfake Face Detection System with a CNN-RNN architecture (ResNeXt50 + BiLSTM).",
      "It achieved 95% accuracy trained on Celeb-DF and FaceForensics++."
    ];
  }
  
  if (hasWord(['aws', 'translate', 'file', 'serverless'])) {
    return [
      "He designed an AI File Translation pipeline using AWS Serverless tech.",
      "It utilizes Lambda, Translate, DynamoDB, Textract, and S3, reducing manual effort by 80%."
    ];
  }
  
  if (hasWord(['cifar10', 'transfer', 'learning', 'cifar'])) {
    return [
      "He evaluated deep CNNs (ResNet, VGG, EfficientNet) using transfer learning on CIFAR-10.",
      "It achieved high-accuracy image classification."
    ];
  }
  
  if (hasWord(['leo', 'voice'])) {
    return [
      "Leo is an AI Voice & Task Assistant Mounish built.",
      "It handles voice command processing, email summarization, and calendar management using React, Node.js, and OpenAI."
    ];
  }
  
  if (hasWord(['terrarist', 'escape', 'board', 'game'])) {
    return [
      "Terrarist Escape is a multiplayer strategy board game.",
      "He built it using React, HTML5 Canvas, TypeScript, and A* Search pathfinding."
    ];
  }

  // General Projects
  if (hasWord(['project', 'projects', 'portfolio', 'work', 'built', 'made'])) {
    return [
      "Mounish has built several impressive projects including:",
      "• Multi-Agent College Management System",
      "• Enterprise RAG Platform",
      "• Heart Disease Classification (PyTorch)",
      "• Agentic Stock Market Analysis",
      "You can find them all in the 'Projects' section."
    ];
  }

  // Experience
  if (hasWord(['experience', 'work', 'internship', 'job', 'nexus', 'iq'])) {
    return [
      "Mounish is currently an AI Engineer at Nexus IQ Solutions in Hyderabad (March 2026 - Present).",
      "He builds Generative AI applications and agentic workflows for enterprise automation.",
      "His work involves LangGraph, LangChain, Gemini, RAG pipelines, and API integrations."
    ];
  }

  // Skills
  if (hasWord(['skill', 'skills', 'tech', 'stack', 'technologies', 'languages'])) {
    return [
      "Mounish's core skills include:",
      "• AI/ML: PyTorch, LangChain, LangGraph, RAG, HuggingFace",
      "• Cloud: AWS (Lambda, S3, DynamoDB, Textract), Docker",
      "• Frontend/Backend: React, Python, Flask, FastAPI, TypeScript",
      "• Databases: PostgreSQL, ChromaDB, DynamoDB"
    ];
  }

  // Education
  if (hasWord(['education', 'degree', 'study', 'university', 'college', 'vit'])) {
    return [
      "Mounish is pursuing an MTech Integrated in Computer Science & Engineering at VIT-AP University (2021-2026).",
      "His current GPA is 8.42/10.",
      "Previously, he completed his 11th & 12th at Narayana Junior College (96.8%)."
    ];
  }

  // Certifications
  if (hasWord(['cert', 'certification', 'certifications'])) {
    return [
      "Mounish holds two major certifications:",
      "• AWS Solutions Architect Associate (SAA-C03)",
      "• AWS AI Practitioner (AIF-C01)"
    ];
  }

  // Research
  if (hasWord(['research', 'publication', 'paper', 'publish', 'journal', 'ijert'])) {
    return [
      "Mounish published 'Heart Disease Risk Prediction Using TabPFN, MLP and PSO Based Ensemble' in IJERT (2025)."
    ];
  }

  return [
    "Hmm...",
    "That information isn't in my knowledge base.",
    "But Mounish would probably enjoy answering it personally."
  ];
};

const TypingText = ({ lines, onComplete }: { lines: string[], onComplete: () => void }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = currentLine[currentCharIndex];
          } else {
            newLines[currentLineIndex] += currentLine[currentCharIndex];
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, lines, onComplete]);

  return (
    <div className="flex flex-col gap-2">
      {displayedLines.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      {currentLineIndex < lines.length && (
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-primary inline-block ml-1 align-middle"
        />
      )}
    </div>
  );
};

export default function AICompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleAIResponse('start', ["Hello, explorer.", "I'm Mounish's AI assistant. Ask me anything about his projects, skills, or experience!"]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, inputValue]);

  const handleAIResponse = (id: string, responseLines: string[]) => {
    setIsTyping(true);
    setMessages(prev => [...prev, { id, sender: 'ai', text: responseLines }]);
  };

  const handleUserSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const query = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: query }]);
    
    // Simulate network delay
    setTimeout(() => {
      handleAIResponse((Date.now() + 1).toString(), generateResponse(query));
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 sm:w-[22rem] h-[500px] max-h-[70vh] liquid-glass rounded-2xl flex flex-col overflow-hidden border border-border/50 shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/20 flex items-center justify-between bg-foreground/5">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <Bot className="w-4 h-4 text-primary relative z-10" />
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">AI Companion</h3>
                  <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-foreground/10" onClick={() => setIsOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
              {messages.map((msg, index) => {
                const isLast = index === messages.length - 1;
                return (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-foreground/10 rounded-tl-sm border border-border/10'}`}>
                      {msg.sender === 'ai' && isLast && isTyping ? (
                        <TypingText 
                          lines={msg.text as string[]} 
                          onComplete={() => setIsTyping(false)} 
                        />
                      ) : (
                        <div className="flex flex-col gap-2">
                          {Array.isArray(msg.text) ? msg.text.map((line, i) => <div key={i} className="whitespace-pre-wrap">{line}</div>) : msg.text}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && messages[messages.length - 1]?.sender === 'user' && (
                <div className="flex justify-start">
                   <div className="max-w-[85%] rounded-2xl p-3 text-sm bg-foreground/10 rounded-tl-sm border border-border/10">
                     <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border/20 bg-foreground/5">
              <form onSubmit={handleUserSend} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isTyping}
                  className="flex-1 bg-background/50 border border-border/50 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!inputValue.trim() || isTyping}
                  className="rounded-full shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full liquid-glass flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)] border border-primary/30 relative"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
        {isOpen ? <X className="w-6 h-6 text-foreground relative z-10" /> : <MessageSquare className="w-6 h-6 text-foreground relative z-10" />}
      </motion.button>
    </div>
  );
}
