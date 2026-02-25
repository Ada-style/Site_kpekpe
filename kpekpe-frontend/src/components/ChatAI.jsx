import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, Bot, User } from 'lucide-react';
import { chatWithAI } from '../services/aiService';

const ChatAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMessage = message;
        setMessage('');
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const historyForAI = [];
            for (let i = 0; i < chatHistory.length; i += 2) {
                if (chatHistory[i] && chatHistory[i + 1]) {
                    historyForAI.push({ user: chatHistory[i].content, ai: chatHistory[i + 1].content });
                }
            }

            const aiReply = await chatWithAI(userMessage, historyForAI);
            setChatHistory(prev => [...prev, { role: 'ai', content: aiReply }]);
        } catch (error) {
            setChatHistory(prev => [...prev, { role: 'ai', content: "Désolé, j'ai rencontré une erreur. Réessayez plus tard." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-kpekpe-green text-kpekpe-yellow rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            >
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    {/* Header */}
                    <div className="bg-kpekpe-green p-4 text-white flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Bot className="text-kpekpe-yellow" />
                        </div>
                        <div>
                            <h3 className="font-bold">Tuteur Kpékpé IA</h3>
                            <p className="text-xs text-kpekpe-yellow/80">En ligne pour vous aider</p>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50" ref={scrollRef}>
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[85%] border border-gray-100">
                            Bonjour ! Je suis votre tuteur IA. Posez-moi vos questions sur vos cours ou votre orientation.
                        </div>

                        {chatHistory.map((chat, index) => (
                            <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-2xl shadow-sm text-sm max-w-[85%] ${chat.role === 'user'
                                        ? 'bg-kpekpe-green text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                                    }`}>
                                    {chat.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 border border-gray-100">
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2">
                        <input
                            type="text"
                            className="flex-grow bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-kpekpe-green"
                            placeholder="Posez votre question..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!message.trim() || isLoading}
                            className="bg-kpekpe-green text-white p-2 rounded-xl hover:bg-opacity-90 disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatAI;
