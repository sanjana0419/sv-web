import React, { useState, useRef, useEffect } from 'react';
import './MessagingSystem.css';

interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
    category: string;
    age: number | null;
    city: string;
    profession: string;
    education: string;
    compatibility: string;
    status: 'pending' | 'accepted' | 'sent';
    pinned: boolean;
    sharedInterests: string[];
}

interface Message {
    id: number;
    sender: 'them' | 'me';
    text: string;
    time: string;
    status: 'read' | 'delivered' | 'sent';
}

const MOCK_CHATS: Chat[] = [
    {
        id: 1,
        name: "Ananya Singh",
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
        lastMessage: "I would love to meet your family.",
        time: "10:45 AM",
        unread: 2,
        online: true,
        category: "Active Chats",
        age: 26,
        city: "Mumbai, MH",
        profession: "Doctor",
        education: "MBBS, MD",
        compatibility: "92%",
        status: "accepted", 
        pinned: true,
        sharedInterests: ["Traveling", "Photography", "Reading"]
    },
    {
        id: 2,
        name: "Sanya Verma",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
        lastMessage: "Interest Request Received",
        time: "Yesterday",
        unread: 1,
        online: false,
        category: "Interests Received",
        age: 24,
        city: "Pune, MH",
        profession: "Software Engineer",
        education: "B.Tech CA",
        compatibility: "88%",
        status: "pending",
        pinned: false,
        sharedInterests: ["Music", "Cooking"]
    }
];

const MOCK_MESSAGES: Message[] = [
    { id: 1, sender: "them", text: "Hello! I saw your profile and really liked it.", time: "10:30 AM", status: "read" },
    { id: 2, sender: "me", text: "Hi! Thank you.", time: "10:32 AM", status: "read" }
];

const MessagingSystem: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const activeChat = MOCK_CHATS.find(c => c.id === selectedChatId);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        const newMsg: Message = {
            id: messages.length + 1,
            sender: "me",
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sent"
        };
        setMessages([...messages, newMsg]);
        setInputValue("");
    };

    return (
        <div className="msg-container glass-panel" style={{height: '70vh', borderRadius: '24px', overflow: 'hidden'}}>
            {/* Sidebar - Simplified */}
            <div className="msg-sidebar" style={{ width: `300px`, backgroundColor: '#fff' }}>
                <div className="msg-sidebar-header">
                    <h2 style={{fontSize: '1.2rem'}}>Messages</h2>
                </div>
                <div className="msg-chat-list">
                    {MOCK_CHATS.map(chat => (
                        <div key={chat.id} className={`msg-chat-item ${selectedChatId === chat.id ? "active" : ""}`} onClick={() => setSelectedChatId(chat.id)}>
                            <img src={chat.avatar} alt={chat.name} className="msg-chat-avatar" />
                            <div className="msg-chat-details">
                                <h4 className="msg-chat-name">{chat.name}</h4>
                                <p className="msg-chat-lastmsg">{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Panel */}
            <div className="msg-main-panel" style={{backgroundColor: '#fafafa'}}>
                {activeChat ? (
                    <>
                        <div className="msg-chat-header">
                             <h3 className="msg-header-name">{activeChat.name}</h3>
                        </div>
                        <div className="msg-chat-area" style={{flex: 1, overflowY: 'auto'}}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`msg-bubble-wrap ${msg.sender}`}>
                                    <div className={`msg-bubble ${msg.sender}`} style={{background: msg.sender === 'me' ? '#8b2332' : '#fff', color: msg.sender === 'me' ? '#fff' : '#000', padding: '10px 15px', borderRadius: '15px', maxWidth: '70%'}}>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form className="msg-input-bar" onSubmit={handleSendMessage} style={{padding: '20px'}}>
                            <input type="text" placeholder="Type a message..." className="msg-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ddd'}} />
                            <button type="submit" className="msg-send-btn" style={{backgroundColor: '#8b2332', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', marginLeft: '10px'}}>Send</button>
                        </form>
                    </>
                ) : <div className="empty-state">Select a chat</div>}
            </div>
        </div>
    );
};

export default MessagingSystem;
