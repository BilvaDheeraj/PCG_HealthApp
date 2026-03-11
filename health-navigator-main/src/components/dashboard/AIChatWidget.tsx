import { motion } from "framer-motion";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { useState } from "react";

type ChatMsg = { role: "user" | "assistant"; content: string };

const mockMessages: ChatMsg[] = [
  { role: "assistant", content: "Hello! I'm your AI health assistant. I can help you understand your lab reports and health trends. What would you like to know?" },
];

export const AIChatWidget = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: "Based on your recent reports, your hemoglobin has shown a steady improvement over the last 3 months. Your Vitamin D levels are still below optimal — I'd recommend 20 minutes of daily sunlight and a Vitamin D3 supplement. Would you like a personalized diet plan?",
        },
      ]);
    }, 1000);
  };

  return (
    <motion.div
      className="glass-card flex flex-col h-[400px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg gradient-patient flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">AI Health Assistant</h3>
          <p className="text-[10px] text-health-green">● Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3 h-3 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "gradient-patient text-primary-foreground rounded-br-sm"
                  : "bg-secondary text-foreground rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-3 border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about your health..."
          className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30"
        />
        <button
          onClick={handleSend}
          className="w-9 h-9 rounded-lg gradient-patient flex items-center justify-center hover:opacity-90 transition-opacity"
        >
          <Send className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>
    </motion.div>
  );
};
