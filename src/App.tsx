import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail,
  Phone,
  Download,
  Code2,
  Briefcase,
  Award,
  GraduationCap,
  ExternalLink,
  ChevronDown,
  Check,
  Menu,
  X,
  Sparkles,
  Zap,
  Target,
  Users,
  TrendingUp,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import AICompanion from './components/AICompanion';
import AICoreReactor from './components/AICoreReactor';

// Brand icons removed from lucide-react — inline SVG fallbacks
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─── Sub-components ──────────────────────────────────────────────────────────

const LiquidGlassCard = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl liquid-glass transition-shadow duration-500 hover:shadow-primary/20 ${className}`}
    >
      {/* Specular highlight reacting to mouse */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const FloatingOrb = ({
  size = 300,
  delay = 0,
  duration = 20,
  style = {},
}: {
  size?: number;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-15 pointer-events-none"
    style={{ width: size, height: size, background: 'radial-gradient(circle, hsl(from var(--primary) h s l / 0.8) 0%, transparent 70%)', ...style }}
    animate={{ x: [0, 80, -80, 0], y: [0, -80, 80, 0], scale: [1, 1.15, 0.85, 1] }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateY(((x - rect.width / 2) / (rect.width / 2)) * 8);
    setRotateX((((rect.height / 2) - y) / (rect.height / 2)) * 8);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => (
  <div className={className}>
    {text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.08 }}
        className="inline-block mr-[0.25em]"
      >
        {word}
      </motion.span>
    ))}
  </div>
);

const InteractiveParticles = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <ParticlesProvider init={async (engine) => await loadSlim(engine)}>
        <Particles
          id="tsparticles"
          className="absolute inset-0 pointer-events-auto"
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                resize: { enable: true },
              },
              modes: {
                grab: { distance: 140, links: { opacity: 1 } },
              },
            },
            particles: {
              color: { value: isDarkMode ? "#ffffff" : "#000000" },
              links: {
                color: isDarkMode ? "#ffffff" : "#000000",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, width: 800 }, value: 80 },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: { enable: true, speed: 1, sync: false }
              },
              shape: { type: "circle" },
              size: {
                value: { min: 1, max: 3 },
                animation: { enable: true, speed: 2, sync: false }
              },
            },
            detectRetina: true,
          }}
        />
      </ParticlesProvider>
    </div>
  );
};

// ─── Portfolio Data ───────────────────────────────────────────────────────────

const portfolioData = {
  name: 'Mounish Reddy',
  title: 'AI Engineer & Cloud-Native Developer',
  phone: '+91 9182925547',
  email: 'bijjamulamounish2003@gmail.com',
  resume: '/Mounish_CV (8).pdf',
  GithubIcon: 'https://github.com/Mounish7028',
  LinkedinIcon: 'https://www.linkedin.com/in/mounish-reddy-bijjamula-398b3024b',
  gfg: 'https://www.geeksforgeeks.org/profile/bijjamulamollyn',
  profileImage: '/Me.jpeg',
  bio: 'Passionate about designing scalable cloud-native solutions and intelligent systems that enhance real-world experiences. Proficient in developing AI-driven applications using AWS, LangChain, and LangGraph.',

  academics: [
    {
      degree: 'MTech Integrated Computer Science & Engineering (5 years)',
      institution: 'VIT-AP University',
      year: '2021–2026',
      gpa: '8.42/10',
    },
    {
      degree: '11th & 12th (MPC)',
      institution: 'Narayana Junior College',
      year: '2019–2021',
      gpa: '968/1000',
    },
    {
      degree: '10th Grade',
      institution: 'Ratnam High School',
      year: '2018–2019',
      gpa: '9.8 CGPA',
    },
  ],

  achievements: [
    {
      title: 'Research Publication',
      year: '2025',
      link: 'https://www.ijert.org/heart-disease-risk-prediction-using-tabpfn-mlp-and-pso-based-ensemble-ijertv15is041900',
      description: 'Published paper "Heart Disease Risk Prediction Using TabPFN, MLP and PSO Based Ensemble" in IJERT.',
    },
    {
      title: 'AWS Certified - Udemy Certifications',
      year: '2024–2025',
      description: 'AWS Solutions Architect Associate (SAA-C03) & AWS AI Practitioner (AIF-C01) certified.',
    },
    {
      title: 'Bulls & Bears Club Member',
      year: '2023–Present',
      description: 'Active member — discussed equity markets, financial analysis, and investment strategies.',
    },
  ],

  skills: [
    {
      category: 'AI / ML Frameworks',
      items: ['PyTorch', 'LangChain', 'LangGraph', 'LangFuse', 'MCP', 'RAG', 'Scikit-learn', 'HuggingFace', 'NLP'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS (Lambda, S3, DynamoDB, Textract, Translate)', 'Docker', 'Git', 'GitHub', 'N8N', 'Postman'],
    },
    {
      category: 'Web Development',
      items: ['Python', 'React', 'Flask', 'FastAPI', 'Streamlit', 'HTML', 'CSS', 'JavaScript'],
    },
    {
      category: 'Databases',
      items: ['MySQL', 'PostgreSQL', 'DynamoDB', 'ChromaDB'],
    },
  ],

  projects: [
    {
      title: 'Multi-Agent College Management Assistant',
      description:
        'Multi-agent system using LangGraph, Streamlit, SQLite, ChromaDB, and Ollama (Qwen2.5 8B) to automate academic information retrieval through natural language queries.',
      tech: ['LangGraph', 'ChromaDB', 'Ollama', 'Streamlit', 'SQLite'],
      link: 'https://github.com/Mounish7028/Multi-Agentic-College-Management-Assistance-System',
      image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&h=600&fit=crop',
    },
    {
      title: 'Enterprise Financial Report Intelligence (RAG)',
      description:
        'Production-grade RAG platform using Flask, React, ChromaDB, and Gemini APIs to enable natural language querying of 350+ page enterprise financial reports.',
      tech: ['Flask', 'React', 'ChromaDB', 'Gemini API', 'TailwindCSS'],
      link: 'https://github.com/Mounish7028/RAGPipeline',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    },
    {
      title: 'Heart Disease Risk Classification',
      description:
        'End-to-end ML web app achieving 98% accuracy using an ensemble of PyTorch MLP, TabPFN, and Particle Swarm Optimization (PSO) with a glassmorphism Flask dashboard.',
      tech: ['PyTorch', 'TabPFN', 'Flask', 'PSO', 'Scikit-learn'],
      link: 'https://github.com/Mounish7028/Heart-Disease-Classification',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
    },
    {
      title: 'Deepfake Face Detection System',
      description:
        'Full-stack AI platform with CNN-RNN architecture (ResNeXt50 + BiLSTM + Attention) achieving 95% detection accuracy, trained on Celeb-DF and FaceForensics++ datasets.',
      tech: ['PyTorch', 'ResNeXt50', 'BiLSTM', 'React', 'FastAPI'],
      link: 'https://github.com/Mounish7028/Deepfake-Face-Detection',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop',
    },
    {
      title: 'AI File Translation (AWS Serverless)',
      description:
        'Serverless file translation pipeline using AWS Translate, Lambda, API Gateway, DynamoDB, Textract, and S3 — reducing manual effort by 80% with IAM & KMS security.',
      tech: ['AWS Lambda', 'AWS Translate', 'DynamoDB', 'S3', 'Textract'],
      link: 'https://github.com/Mounish7028/AI-File-Translator-using-AWS',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    },
    {
      title: 'Agentic Stock Market Analysis',
      description:
        'Multi-agent financial analysis system using LangGraph and LLMs to perform automated stock research, sentiment analysis, technical analysis, and portfolio recommendations.',
      tech: ['LangGraph', 'Python', 'Financial APIs', 'Gemini API', 'Streamlit'],
      link: 'https://github.com/Mounish7028/Agentic-Stock-Market-Analysis',
      image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&h=600&fit=crop',
    },
    {
      title: 'Transfer Learning on CIFAR-10',
      description:
        'Evaluating and benchmarking deep convolutional neural networks (ResNet, VGG, EfficientNet) using transfer learning techniques to achieve high-accuracy image classification.',
      tech: ['PyTorch', 'Transfer Learning', 'CNN', 'ResNet', 'Computer Vision'],
      link: 'https://github.com/Mounish7028/Transfer-Learning-Cifar10-',
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=600&fit=crop',
    },
    {
      title: 'Leo AI Voice & Task Assistant',
      description:
        'An intelligent task automation and workspace assistant supporting voice command processing, email summarization, and calendar management.',
      tech: ['React', 'Node.js', 'OpenAI API', 'TailwindCSS', 'MongoDB'],
      link: 'https://github.com/Mounish7028/Leo-project',
      image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=800&h=600&fit=crop',
    },
    {
      title: 'Terrarist Escape Board Game',
      description:
        'A dynamic multiplayer strategy board game featuring pathfinding algorithms, interactive graphics, and turn-based mechanics.',
      tech: ['React', 'HTML5 Canvas', 'TypeScript', 'TailwindCSS', 'A* Search'],
      link: 'https://github.com/Mounish7028/Terrarist-escape-board-game',
      image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=800&h=600&fit=crop',
    },
  ],



  workExperience: [
    {
      company: 'Nexus IQ Solutions, Hyderabad',
      position: 'AI Engineer',
      period: 'March 2026 – Present',
      description:
        'Developing Generative AI applications and agentic workflows for enterprise automation and intelligent information retrieval.',
      achievements: [
        'Building agentic workflows using LangGraph, LangChain, Gemini, and open-source LLMs',
        'Designing RAG pipelines with document processing, BGE embeddings, vector DBs, and semantic search',
        'Building AI-powered assistants with tool calling, conversational memory, and prompt engineering',
        'Integrating REST APIs, cloud services; contributing to model evaluation and production deployment',
      ],
    },
  ],
  faq: [
    {
      question: 'What technologies do you specialise in?',
      answer:
        'I specialise in AI/ML engineering with LangChain, LangGraph, PyTorch, and RAG pipelines, cloud-native development on AWS, and full-stack web apps with React, Flask, and FastAPI.',
    },
    {
      question: 'What is your typical project timeline?',
      answer:
        'Timelines vary by complexity. A typical AI web application takes 4–8 weeks from concept to deployment. I provide detailed timelines during the consultation phase.',
    },
    {
      question: 'Do you offer ongoing support?',
      answer:
        'Yes, I offer various support packages including bug fixes, feature updates, model fine-tuning, and performance optimisation after project delivery.',
    },
    {
      question: 'Can you work with existing codebases?',
      answer:
        'Absolutely! I have experience working with legacy code, refactoring, and adding AI capabilities to existing applications while maintaining full functionality.',
    },
    {
      question: 'What is your development process?',
      answer:
        'I follow an agile methodology with regular check-ins, iterative development, and continuous feedback to ensure transparency and alignment with your business goals.',
    },
  ],
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const navItems = ['About', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden transition-colors duration-500">
      {/* ── Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* ── Navigation ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 left-4 right-4 md:left-12 md:right-12 z-40 liquid-glass rounded-full px-2"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent cursor-default"
          >
            {portfolioData.name}
          </motion.div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="rounded-full hover:bg-foreground/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </Button>
            <Button size="sm" className="hidden md:flex rounded-full liquid-glass border border-foreground/20 text-foreground hover:bg-foreground/10 bg-transparent shadow-none" asChild>
              <a href={portfolioData.resume} download>
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden rounded-full hover:bg-foreground/10"
              onClick={() => setMobileMenuOpen((v) => !v)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border/20 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                  >
                    {item}
                  </a>
                ))}
                <Button size="sm" className="w-fit rounded-full liquid-glass border border-foreground/20 text-foreground bg-transparent" asChild>
                  <a href={portfolioData.resume} download>
                    <Download className="w-4 h-4 mr-2" />
                    Resume
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO                                                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <InteractiveParticles isDarkMode={isDarkMode} />
        <FloatingOrb size={500} delay={0} duration={22} style={{ top: '10%', left: '5%' }} />
        <FloatingOrb size={350} delay={3} duration={18} style={{ bottom: '15%', right: '8%' }} />
        <FloatingOrb size={200} delay={6} duration={14} style={{ top: '40%', right: '20%' }} />

        <motion.div style={{ y: heroY }} className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, type: 'spring' }}
              className="mb-6"
            >
              <Sparkles className="w-14 h-14 mx-auto text-primary" />
            </motion.div>

            {/* Profile image */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/30 ring-offset-4 ring-offset-background shadow-2xl">
                  <img
                    src={portfolioData.profileImage}
                    alt={portfolioData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(portfolioData.name)}&size=128&background=random`;
                    }}
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"
                />
              </div>
            </motion.div>

            <AnimatedText
              text={`Hi, I'm ${portfolioData.name}`}
              className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-foreground via-foreground/80 to-foreground/50 bg-clip-text text-transparent leading-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium"
            >
              {portfolioData.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {portfolioData.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-4 justify-center mb-10"
            >
              <Button size="lg" className="group text-base px-8" asChild>
                <a href="#contact">
                  Get In Touch
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="ml-1"
                  >
                    →
                  </motion.span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex gap-4 justify-center"
            >
              {[
                { icon: GithubIcon, link: portfolioData.GithubIcon, label: 'GithubIcon' },
                { icon: LinkedinIcon, link: portfolioData.LinkedinIcon, label: 'LinkedinIcon' },
                { icon: Mail, link: `mailto:${portfolioData.email}`, label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-primary/10 border border-border/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WHY WORK WITH ME                                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Work With Me</h2>
            <p className="text-xl text-muted-foreground">Proven track record of delivering excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Fast Delivery', desc: 'Quick turnaround without compromising quality', color: 'text-yellow-500' },
              { icon: Target, title: 'Precision', desc: 'Pixel-perfect implementation of designs', color: 'text-blue-500' },
              { icon: Users, title: 'Collaboration', desc: 'Clear communication throughout the project', color: 'text-green-500' },
              { icon: TrendingUp, title: 'Growth Focus', desc: 'Scalable solutions for future expansion', color: 'text-purple-500' },
            ].map((feature, i) => (
              <TiltCard key={i}>
                <LiquidGlassCard delay={i * 0.1} className="h-full">
                  <div className="p-6 text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${feature.color}`}
                    >
                      <feature.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.desc}</p>
                  </div>
                </LiquidGlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ABOUT ME                                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground">My journey, skills, and achievements</p>
          </motion.div>

          <Tabs defaultValue="academics" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto">
              <TabsTrigger value="academics" className="py-2">Academics</TabsTrigger>
              <TabsTrigger value="skills" className="py-2">Skills</TabsTrigger>
              <TabsTrigger value="achievements" className="py-2">Achievements</TabsTrigger>
              <TabsTrigger value="links" className="py-2">Links</TabsTrigger>
            </TabsList>

            <TabsContent value="academics">
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.academics.map((edu, i) => (
                  <LiquidGlassCard key={i} delay={i * 0.1}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                          <p className="text-muted-foreground mb-2">{edu.institution}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary">{edu.year}</Badge>
                            <span className="text-primary font-semibold">GPA: {edu.gpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </LiquidGlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.skills.map((skillGroup, i) => (
                  <LiquidGlassCard key={i} delay={i * 0.1}>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Code2 className="w-5 h-5 text-primary" />
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, j) => (
                          <motion.div key={j} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Badge variant="outline" className="text-sm cursor-default">{skill}</Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </LiquidGlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.achievements.map((achievement, i) => (
                  <LiquidGlassCard key={i} delay={i * 0.1}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.year}</p>
                          <p className="text-muted-foreground mb-3">{achievement.description}</p>
                          {achievement.link && (
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                            >
                              {achievement.title === 'Research Publication' ? 'View Paper' : 'View Link'}
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </LiquidGlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="links">
              <LiquidGlassCard>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary" />
                        <span>{portfolioData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>{portfolioData.email}</span>
                      </div>
                      <Button className="w-full mt-4" asChild>
                        <a href={portfolioData.resume} download>
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </a>
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold mb-4">Professional Links</h3>
                      {[
                        { icon: GithubIcon, label: 'GithubIcon Profile', href: portfolioData.GithubIcon },
                        { icon: LinkedinIcon, label: 'LinkedinIcon Profile', href: portfolioData.LinkedinIcon },
                        { icon: Code2, label: 'GeeksforGeeks Profile', href: portfolioData.gfg },
                      ].map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 hover:text-primary transition-colors group"
                        >
                          <link.icon className="w-5 h-5" />
                          <span>{link.label}</span>
                          <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PROJECTS                                                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground">Some of my recent work</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, i) => (
              <TiltCard key={i}>
                <LiquidGlassCard delay={i * 0.1} className="h-full">
                  <div className="overflow-hidden rounded-t-2xl">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4 }}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, j) => (
                        <Badge key={j} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </LiquidGlassCard>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WORK EXPERIENCE                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="experience" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Work Experience</h2>
            <p className="text-xl text-muted-foreground">My professional journey</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {portfolioData.workExperience.map((work, i) => (
              <LiquidGlassCard key={i} delay={i * 0.1}>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-xl font-bold">{work.position}</h3>
                          <p className="text-muted-foreground">{work.company}</p>
                        </div>
                        <Badge>{work.period}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm">{work.description}</p>
                      <div className="space-y-1.5">
                        {work.achievements.map((achievement, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FAQ                                                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="faq" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {portfolioData.faq.map((item, i) => (
              <LiquidGlassCard key={i} delay={i * 0.05}>
                <div className="p-0">
                  <button
                    id={`faq-btn-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 flex items-center justify-between font-semibold hover:text-primary transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.question}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5 opacity-60 rotate-45" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* CONTACT                                                     */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">Let's build something amazing together</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact info */}
            <LiquidGlassCard>
              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Whether you have a project in mind, a question, or just want to say hi — my inbox is always open.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}` },
                    { icon: Phone, label: 'Phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
                    { icon: GithubIcon, label: 'GitHub', value: 'https://github.com/Mounish7028', href: portfolioData.GithubIcon },
                    { icon: LinkedinIcon, label: 'LinkedIn', value: 'https://www.linkedin.com/in/mounish-reddy-bijjamula-398b3024b', href: portfolioData.LinkedinIcon },
                  ].map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 group hover:text-primary transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <contact.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{contact.label}</p>
                        <p className="text-sm font-medium">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </LiquidGlassCard>

            {/* Contact form */}
            <LiquidGlassCard>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <AnimatePresence mode="wait">
                  {formSent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center py-12 text-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center"
                      >
                        <Check className="w-8 h-8 text-green-500" />
                      </motion.div>
                      <p className="text-xl font-bold">Message Sent!</p>
                      <p className="text-muted-foreground">I'll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <label htmlFor="contact-name" className="text-sm font-medium mb-1.5 block">Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="text-sm font-medium mb-1.5 block">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={contactForm.email}
                          onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="text-sm font-medium mb-1.5 block">Message</label>
                        <textarea
                          id="contact-message"
                          required
                          rows={5}
                          placeholder="Tell me about your project..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] resize-none"
                        />
                      </div>
                      <Button type="submit" className="w-full text-base py-5">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </LiquidGlassCard>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[
                { icon: GithubIcon, href: portfolioData.GithubIcon, label: 'GithubIcon' },
                { icon: LinkedinIcon, href: portfolioData.LinkedinIcon, label: 'LinkedinIcon' },
                { icon: Mail, href: `mailto:${portfolioData.email}`, label: 'Email' },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      <AICompanion />
      <AICoreReactor />
    </div>
  );
}
