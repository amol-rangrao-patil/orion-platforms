import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  ShieldCheck, 
  MapPin, 
  Check, 
  Copy, 
  Server, 
  Database, 
  Layers, 
  ExternalLink,
  Cpu,
  Terminal as TerminalIcon,
  Sparkles,
  Zap,
  Activity,
  Play,
  CheckCircle,
  Network
} from 'lucide-react';
import { COMPANY_COORDINATES, COMPANY_ADDRESS, COMPANY_CONTACT } from '../data/companyInfo';

type ConsoleTab = 'architecture' | 'code' | 'security' | 'location';

export const InteractiveTechConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('architecture');
  const [copied, setCopied] = useState(false);
  const [activeNode, setActiveNode] = useState<string>('gateway');
  const [istTime, setIstTime] = useState<string>('');
  const [activeCodeFile, setActiveCodeFile] = useState<string>('server.ts');

  // Interactive Traffic Simulation State
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [simulatedRps, setSimulatedRps] = useState(14850);
  const [simulatedLatency, setSimulatedLatency] = useState(11.2);

  // Diagnostic Test State in Code tab
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(new Date());
        setIstTime(timeString);
      } catch {
        setIstTime('09:30:00 AM');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle natural fluctuation in live traffic RPS
  useEffect(() => {
    const trafficInterval = setInterval(() => {
      if (!isSimulatingSpike) {
        const randomDelta = Math.floor(Math.random() * 120) - 60;
        setSimulatedRps((prev) => Math.max(14500, Math.min(15300, prev + randomDelta)));
        const latencyDelta = (Math.random() * 0.4 - 0.2);
        setSimulatedLatency((prev) => Number(Math.max(10.8, Math.min(12.4, prev + latencyDelta)).toFixed(1)));
      }
    }, 1800);
    return () => clearInterval(trafficInterval);
  }, [isSimulatingSpike]);

  const triggerTrafficSpike = () => {
    if (isSimulatingSpike) return;
    setIsSimulatingSpike(true);
    setSimulatedRps(41250);
    setSimulatedLatency(13.8);

    setTimeout(() => {
      setSimulatedRps(28400);
      setSimulatedLatency(12.2);
    }, 2000);

    setTimeout(() => {
      setIsSimulatingSpike(false);
      setSimulatedRps(14880);
      setSimulatedLatency(11.2);
    }, 4500);
  };

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runDiagnosticTest = () => {
    if (isRunningDiagnostic) return;
    setIsRunningDiagnostic(true);
    setDiagnosticLogs([]);

    const steps = [
      '⚡ [00:00.02] Initializing Orion Platforms Distributed Mesh v4.2...',
      '🔐 [00:00.08] Negotiating TLS 1.3 cryptographic ciphers (AES-256-GCM)... OK',
      '🌐 [00:00.16] Validating Global Edge CDN routing across 280+ POPs (11.2ms)... OK',
      '⚖️ [00:00.24] API Gateway rate limiter & JWT cryptographic signature... VERIFIED',
      '🚀 [00:00.32] Microservices pod auto-scaling mesh (Kubernetes v1.31)... HEALTHY',
      '🗄️ [00:00.41] PostgreSQL Read/Write split cluster replica sync (0ms lag)... SYNCHRONIZED',
      '🛡️ [00:00.50] Vulnerability penetration test audit: 0 critical vulnerabilities detected',
      '✨ [00:00.58] ALL SYSTEMS OPERATIONAL: SLA 99.99% GUARANTEED'
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setDiagnosticLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsRunningDiagnostic(false);
        }
      }, (idx + 1) * 350);
    });
  };

  const codeSnippets: Record<string, string> = {
    'server.ts': `// Orion Platforms Architecture Core
import { createOrionEngine } from '@orion/core';
import { postgreSQLCluster } from '@orion/db';

export const enterpriseApp = createOrionEngine({
  company: "Orion Platforms, Inc.",
  coordinates: "16.69110, 73.99104", // Kolhapur Tech Hub
  slaTarget: "99.99%",
  ipOwnership: "100% Client Transferred",
  database: postgreSQLCluster({ replicas: 3, readWriteSplit: true }),
  security: { encryption: "AES-256-GCM", tls: "1.3" }
});`,
    'schema.prisma': `// Bespoke Client Data Architecture
datasource db {
  provider = "postgresql"
  url      = env("ORION_SECURE_DATABASE_URL")
}

model EnterpriseClient {
  id              String       @id @default(uuid())
  organization    String
  primaryContact  String
  serviceCategory String
  status          ProjectState @default(ACTIVE)
  createdAt       DateTime     @default(now())
  slaResponseHrs  Int          @default(2)
}`,
    'docker-compose.yml': `version: '3.9'
services:
  orion-api:
    image: orion/enterprise-node:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_SSL_REQUIRED=true
    deploy:
      replicas: 4
      restart_policy:
        condition: on-failure`
  };

  const topologyNodes = [
    {
      id: 'edge',
      num: '01',
      title: 'Global Edge CDN',
      sub: 'Cloudflare & TLS 1.3',
      badge: '11.2ms Edge Latency',
      desc: 'Global Edge Caching caches static UI assets and secures APIs against DDoS attacks with sub-15ms edge routing.',
      icon: <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    },
    {
      id: 'gateway',
      num: '02',
      title: 'API Gateway & Auth',
      sub: 'JWT + Rate Limiting',
      badge: 'Zero-Trust Policy',
      desc: 'Enterprise API Gateway enforces role-based permissions, cryptographic token verification, and payload sanitization.',
      icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
    },
    {
      id: 'microservices',
      num: '03',
      title: 'App Microservices',
      sub: 'Docker & Kubernetes',
      badge: 'Auto-Scaling 10k+',
      desc: 'Decoupled application logic running containerized microservices on AWS/GCP with zero-downtime rolling updates.',
      icon: <Server className="w-5 h-5 text-sky-600 dark:text-sky-400" />
    },
    {
      id: 'database',
      num: '04',
      title: 'PostgreSQL & Redis',
      sub: 'Automated Multi-AZ',
      badge: 'Encrypted At Rest',
      desc: 'Clustered multi-AZ relational databases with read replicas and sub-millisecond Redis cache layers.',
      icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden mb-16 relative"
    >
      
      {/* Console Window Header with Active Status */}
      <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 bg-slate-100/90 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
        <div className="flex items-center space-x-2 sm:space-x-2.5 min-w-0">
          <div className="flex space-x-1.5 shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80 hover:opacity-100 transition-opacity" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80 hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-slate-300 dark:text-slate-700 shrink-0">|</span>
          <div className="flex items-center space-x-1.5 sm:space-x-2 font-mono text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
            <TerminalIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a73e8] dark:text-blue-400 shrink-0" />
            <span className="truncate">orion-sys-console ~ mesh</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 font-mono text-[11px] sm:text-xs lg:text-sm text-slate-700 dark:text-slate-300 shrink-0">
          <div className="flex items-center space-x-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline font-semibold text-emerald-700 dark:text-emerald-400">Live IST Desk:</span>
            <span className="font-semibold text-slate-950 dark:text-white">{istTime || 'Loading...'} IST</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs with Smooth Highlight & Responsive Spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70 p-1.5 sm:p-2 gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer truncate ${
            activeTab === 'architecture'
              ? 'bg-white dark:bg-slate-800 text-[#1a73e8] dark:text-blue-400 border border-slate-200 dark:border-slate-700 shadow-sm font-bold'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <Network className="w-4 h-4 shrink-0" />
          <span className="truncate">Cloud Topology</span>
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer truncate ${
            activeTab === 'code'
              ? 'bg-white dark:bg-slate-800 text-[#1a73e8] dark:text-blue-400 border border-slate-200 dark:border-slate-700 shadow-sm font-bold'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <Code2 className="w-4 h-4 shrink-0" />
          <span className="truncate">Code & Stack</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer truncate ${
            activeTab === 'security'
              ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-sm font-bold'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="truncate">IP & NDA</span>
        </button>

        <button
          onClick={() => setActiveTab('location')}
          className={`flex items-center justify-center space-x-1.5 sm:space-x-2 py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl transition-all cursor-pointer truncate ${
            activeTab === 'location'
              ? 'bg-white dark:bg-slate-800 text-[#1a73e8] dark:text-blue-400 border border-slate-200 dark:border-slate-700 shadow-sm font-bold'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
          }`}
        >
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">Engineering Hub</span>
        </button>
      </div>

      {/* Tab Switching with AnimatePresence */}
      <AnimatePresence mode="wait">
        
        {/* Tab 1: Cloud Architecture Diagram with Animated Data Pipeline */}
        {activeTab === 'architecture' && (
          <motion.div 
            key="architecture"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 space-y-6"
          >
            {/* Top Bar with Live Telemetry Tickers & Simulation Trigger */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                  <span>Enterprise High-Availability Mesh Telemetry</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  Real-time pipeline inspection of custom deployed software architectures.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Live RPS Meter */}
                <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400 mr-1.5">Throughput:</span>
                  <span className="font-bold text-[#1a73e8] dark:text-blue-400">
                    {simulatedRps.toLocaleString()} req/s
                  </span>
                </div>

                {/* Live Latency Meter */}
                <div className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <span className="text-slate-500 dark:text-slate-400 mr-1.5">Latency:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {simulatedLatency} ms
                  </span>
                </div>

                {/* Interactive Traffic Spike Simulator Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerTrafficSpike}
                  disabled={isSimulatingSpike}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isSimulatingSpike
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 animate-pulse'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-sm'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isSimulatingSpike ? 'Spike Test In Progress...' : 'Simulate Traffic Spike'}</span>
                </motion.button>
              </div>
            </div>

            {/* Spike Notification Banner */}
            <AnimatePresence>
              {isSimulatingSpike && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>⚡ Traffic Spike Detected: Auto-scaled 12 new worker pods in 380ms. 0 packets dropped. SLA sustained.</span>
                  </div>
                  <span className="font-bold">STATUS: 100% HEALTHY</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Architecture Node Visualizer with Card Animation & Traveling Data Line */}
            <div className="relative">
              {/* Animated Glowing Connecting Pulse Line across the top */}
              <div className="hidden sm:block absolute top-7 left-12 right-12 h-0.5 bg-slate-200 dark:bg-slate-800 pointer-events-none z-0">
                <motion.div 
                  animate={{
                    left: ['0%', '100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: isSimulatingSpike ? 0.9 : 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-[-2px] w-16 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 shadow-md shadow-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5 pt-2 relative z-10">
                {topologyNodes.map((node) => (
                  <motion.div
                    key={node.id}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveNode(node.id)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      activeNode === node.id
                        ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/45 shadow-lg shadow-blue-500/15'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50 hover:border-blue-400 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {activeNode === node.id && (
                      <>
                        <motion.div 
                          layoutId="activeGlow"
                          className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500"
                        />
                        <span className="absolute inset-0 rounded-xl ring-2 ring-blue-500/40 pointer-events-none" />
                      </>
                    )}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        {node.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">{node.num}</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">{node.title}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">{node.sub}</div>
                    <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-3 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{node.badge}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Active Node Spec Inspector Panel */}
            <motion.div 
              key={activeNode}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner"
            >
              <div>
                <span className="font-bold text-slate-950 dark:text-white flex items-center space-x-2 text-sm sm:text-base">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>Selected Node Inspection: {activeNode.toUpperCase()}</span>
                </span>
                <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm mt-1 leading-relaxed">
                  {topologyNodes.find(n => n.id === activeNode)?.desc}
                </p>
              </div>
              <div className="font-mono text-xs font-bold px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shadow-xs">
                STATUS: HEALTHY (0ms DRIFT)
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Tab 2: Code, Stack & Live Diagnostic Terminal */}
        {activeTab === 'code' && (
          <motion.div 
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex space-x-2">
                {Object.keys(codeSnippets).map((fileName) => (
                  <button
                    key={fileName}
                    onClick={() => setActiveCodeFile(fileName)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeCodeFile === fileName
                        ? 'bg-[#1a73e8] text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {fileName}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                {/* Live Diagnostic Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={runDiagnosticTest}
                  disabled={isRunningDiagnostic}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isRunningDiagnostic ? 'Testing Pipeline...' : 'Run Diagnostic Test'}</span>
                </motion.button>

                <button
                  onClick={() => handleCopyCode(codeSnippets[activeCodeFile])}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
              <pre>{codeSnippets[activeCodeFile]}</pre>
            </div>

            {/* Live Terminal Diagnostic Stream Output */}
            {diagnosticLogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-5 rounded-xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 space-y-1.5 shadow-lg"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="flex items-center space-x-1.5">
                    <TerminalIcon className="w-3 h-3 text-emerald-400" />
                    <span>Live Verification Stream</span>
                  </span>
                  <button 
                    onClick={() => setDiagnosticLogs([])}
                    className="hover:text-white transition-colors"
                  >
                    Clear Output
                  </button>
                </div>
                {diagnosticLogs.map((log, lIdx) => (
                  <motion.div 
                    key={lIdx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {log}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Tab 3: Security & NDA Guarantee */}
        {activeTab === 'security' && (
          <motion.div 
            key="security"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 space-y-6"
          >
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                Institutional Client Protections & Contractual Guarantees
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Orion Platforms operates under strict compliance, ensuring your intellectual assets remain exclusively yours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <Check className="w-4 h-4" />
                  <span>100% IP & Code Ownership</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  All custom software repositories, documentation, and database designs are completely signed over to your organization. Zero vendor lock-in.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <Check className="w-4 h-4" />
                  <span>Mutual NDA Available Instantly</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  We sign formal Non-Disclosure Agreements prior to deep technical architecture reviews to protect your proprietary trade secrets.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <Check className="w-4 h-4" />
                  <span>Clean Code & Automated Testing</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  Unit test suites, integration tests, and static vulnerability scanning are integrated directly into our CI/CD pipelines before delivery.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
              >
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1.5">
                  <Check className="w-4 h-4" />
                  <span>Direct Architect Consultation</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  Clients interface directly with principal software engineers and solutions architects — no non-technical sales intermediaries.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Location & Operating Telemetry */}
        {activeTab === 'location' && (
          <motion.div 
            key="location"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                  Orion Platforms Headquarters & Tech Center
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  Kolhapur District, Maharashtra — High-Performance Engineering Center
                </p>
              </div>
              <a
                href={COMPANY_COORDINATES.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold transition-all cursor-pointer shadow-sm w-fit"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center space-x-2.5 text-sm">
                <MapPin className="w-5 h-5 text-rose-500 shrink-0" />
                <span className="font-bold text-slate-950 dark:text-white">
                  {COMPANY_ADDRESS.displayAddress}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 font-medium">GPS Coordinates</div>
                  <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    16.69110, 73.99104
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 font-medium">Operating Schedule</div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">
                    Mon – Fri (9:00 AM – 6:30 PM IST)
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500 font-medium">Direct Engineering Desk</div>
                  <div className="font-mono font-bold text-[#1a73e8] dark:text-blue-400 mt-1 truncate">
                    {COMPANY_CONTACT.solutionsEmail}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Footer Status Strip with Pulse */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center space-x-3 font-medium">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">All Distributed Clusters Operational</span>
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
          <span className="hidden sm:inline">Architecture Gateway Online</span>
        </div>
        <div className="font-mono text-slate-500 dark:text-slate-400 text-xs">
          v4.2-enterprise-mesh • SLA 99.99%
        </div>
      </div>

    </motion.div>
  );
};
