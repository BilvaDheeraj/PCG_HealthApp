"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, FileText, Loader2, MessageSquare, ChevronRight, X } from "lucide-react";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const SYSTEM_CONTEXT = `You are PCG Health AI, a clinical health assistant for the PCG Health platform. 
You have access to the patient's health data:
- HbA1c: 6.2% (pre-diabetic range, improved from 6.8% in January 2024)
- LDL Cholesterol: 145 mg/dL (elevated, reduced from 165 mg/dL)
- HDL Cholesterol: 45 mg/dL (normal)
- Fasting Glucose: 106 mg/dL (borderline)
- Triglycerides: 180 mg/dL (elevated)
- Vitamin D3: 22 ng/mL (deficient)
- Hemoglobin: 14.5 g/dL (normal)
- CRP: 0.7 mg/L (optimal)
- TSH: 2.1 mIU/L (normal)
Patient profile: Indian male, age 35, weight 82kg, height 175cm, office worker, minimal exercise.
Provide concise, actionable, medically sound responses. Reference the patient's specific values. 
Add a disclaimer to consult a doctor for medical decisions. Keep responses under 200 words.`;

const suggested = [
    "Why is my cholesterol high?",
    "Am I at risk for diabetes?",
    "What diet should I follow?",
    "Am I improving over time?",
    "Why is my Vitamin D low?",
    "What supplements should I take?",
];

const contextPills = [
    { label: "Oct 2024 Report", icon: FileText },
    { label: "9-Month History", icon: MessageSquare },
    { label: "Medical KB", icon: Sparkles },
];

interface Message {
    id: string;
    role: "user" | "assistant";
    text: string;
    time: string;
}

async function callGemini(messages: Message[], newMessage: string): Promise<string> {
    const history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
    }));

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
                contents: [
                    ...history,
                    { role: "user", parts: [{ text: newMessage }] },
                ],
                generationConfig: { maxOutputTokens: 400, temperature: 0.3 },
            }),
        }
    );

    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't process that. Please try again.";
}

function TypingIndicator() {
    return (
        <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 rounded-full bg-emerald-400/60"
                        style={{ animation: `bounce 1.2s infinite ${i * 0.2}s` }} />
                ))}
            </div>
            <span className="text-xs text-white/40">PCG AI is analyzing your reports...</span>
        </div>
    );
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            text: "Hello! I'm PCG Health AI, your personal health intelligence assistant. I have full context of your health reports and biomarker history.\n\nI can help you understand your results, explain trends, suggest diet and lifestyle changes, or answer any health questions based on your data. What would you like to know today?",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showContext, setShowContext] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || loading) return;
        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            text: text.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const reply = await callGemini(messages, text.trim());
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                text: reply,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                text: "I'm having trouble connecting right now. Please check your connection and try again.",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }]);
        } finally {
            setLoading(false);
            inputRef.current?.focus();
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-110px)] animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">AI Health Chat</h2>
                    <p className="text-white/40 text-xs mt-0.5">RAG-powered medical assistant with access to your full health history</p>
                </div>
                <button
                    onClick={() => setMessages([messages[0]])}
                    className="px-3 py-1.5 text-xs font-bold text-white/40 hover:text-white/70 border border-white/8 hover:border-white/15 rounded-xl transition-all"
                >
                    New Chat
                </button>
            </div>

            {/* Context Pills */}
            {showContext && (
                <div className="flex items-center gap-2 mb-4 flex-wrap shrink-0">
                    <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Using Context:</span>
                    {contextPills.map((p, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/8 border border-emerald-500/15">
                            <p.icon className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] font-bold text-emerald-300">{p.label}</span>
                        </div>
                    ))}
                    <button onClick={() => setShowContext(false)} className="ml-auto text-white/20 hover:text-white/50"><X size={12} /></button>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-0">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${msg.role === "assistant"
                                    ? "bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20"
                                    : "bg-white/10 border border-white/10"
                                }`}>
                                {msg.role === "assistant" ? <Sparkles className="w-4 h-4 text-white" /> : <User className="w-4 h-4 text-white/70" />}
                            </div>

                            <div className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-tr-sm shadow-lg shadow-emerald-500/15"
                                        : "bg-[#0d1320] border border-white/8 text-white/85 rounded-tl-sm"
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-white/25 px-1">{msg.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shrink-0">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-[#0d1320] border border-white/8 rounded-2xl rounded-tl-sm">
                            <TypingIndicator />
                        </div>
                    </motion.div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 2 && (
                <div className="mt-4 flex gap-2 flex-wrap shrink-0">
                    {suggested.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => sendMessage(q)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/8 text-xs text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.07] transition-all"
                        >
                            {q} <ChevronRight size={10} className="opacity-40" />
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="mt-4 flex items-center gap-3 bg-[#080c14] border border-white/10 rounded-2xl px-5 py-3.5 focus-within:border-emerald-500/40 transition-colors shrink-0">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
                    placeholder="Ask about your health data, biomarkers, diet, or trends..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                />
                <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || loading}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center hover:from-emerald-400 hover:to-teal-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-emerald-500/20"
                >
                    {loading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                </button>
            </div>
            <p className="text-[10px] text-white/20 text-center mt-2 shrink-0">AI responses are for informational purposes only. Consult a qualified doctor for medical decisions.</p>

            <style jsx global>{`
                @keyframes bounce {
                    0%, 60%, 100% { transform: translateY(0); }
                    30% { transform: translateY(-6px); }
                }
            `}</style>
        </div>
    );
}
