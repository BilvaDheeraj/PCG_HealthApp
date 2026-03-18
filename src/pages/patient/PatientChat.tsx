import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  { role: "ai", text: "Hello! I'm your HealthAI assistant. I have access to your uploaded reports and biomarker history. Ask me anything about your health!" },
];

const sampleQuestions = [
  "Why is my Vitamin D low?",
  "Am I at risk for diabetes?",
  "What foods can lower my cholesterol?",
  "How has my hemoglobin changed?",
];

const aiResponses: Record<string, string> = {
  "Why is my Vitamin D low?": "Your Vitamin D level is 14 ng/mL, significantly below the optimal range of 30-50 ng/mL. This could be due to limited sun exposure, dietary insufficiency, or reduced absorption. I recommend spending 20 minutes daily in sunlight and taking a Vitamin D3 supplement of 2000 IU.",
  "Am I at risk for diabetes?": "Based on your recent HbA1c of 6.2%, you fall in the pre-diabetic range (5.7-6.4%). Your fasting glucose of 98 mg/dL is also near the upper limit. I suggest reducing refined carbohydrates, increasing physical activity to 30 minutes daily, and retesting in 3 months.",
  "What foods can lower my cholesterol?": "Your cholesterol is currently within range (LDL: 118 mg/dL), but here are foods that help maintain healthy levels: oats, nuts (almonds, walnuts), fatty fish (salmon, mackerel), olive oil, beans, and avocados. Also limit saturated fats and trans fats.",
  "How has my hemoglobin changed?": "Your hemoglobin has been stable at 14.2 g/dL across your last three reports, which is well within the normal range (13.5-17.5 g/dL for males). No concerns here — great job maintaining your iron intake!",
};

const PatientChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[text] || "Based on your health data, I'd recommend discussing this specific concern with your healthcare provider for a more detailed evaluation. In the meantime, I can help you track relevant biomarkers and set reminders for follow-up tests.";
      setMessages(prev => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <DashboardLayout role="patient">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" /> AI Health Chat
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Ask questions about your health reports and biomarkers</p>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 mb-4 pr-2">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-lg gradient-patient flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary/10 border border-primary/20 text-foreground"
                  : "glass-card text-foreground"
              }`}>
                {msg.text}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div className="flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="w-8 h-8 rounded-lg gradient-patient flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="glass-card p-4 rounded-xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick Questions */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleQuestions.map(q => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-3 p-3 glass-card rounded-xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask about your health..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-9 h-9 rounded-lg gradient-patient flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientChat;
