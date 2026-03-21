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
    },
    {
        id: 3,
        name: "Rahul's Family",
        avatar: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80",
        lastMessage: "Let's schedule a call this Sunday.",
        time: "Tuesday",
        unread: 0,
        online: true,
        category: "Family Discussions",
        age: null,
        city: "Delhi, NCR",
        profession: "Business",
        education: "MBA",
        compatibility: "N/A",
        status: "accepted",
        pinned: false,
        sharedInterests: []
    },
    {
        id: 4,
        name: "Zara Khan",
        avatar: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=400&q=80",
        lastMessage: "You sent an interest request.",
        time: "12:30 PM",
        unread: 0,
        online: true,
        category: "Interests Sent",
        age: 25,
        city: "Delhi, NCR",
        profession: "Interior Designer",
        education: "B.Des",
        compatibility: "85%",
        status: "sent",
        pinned: false,
        sharedInterests: ["Art", "Design"]
    }
];

const MOCK_MESSAGES: Message[] = [
    { id: 1, sender: "them", text: "Hello! I saw your profile and really liked it.", time: "10:30 AM", status: "read" },
    { id: 2, sender: "me", text: "Hi Ananya! Thank you. Your profile is quite interesting too.", time: "10:32 AM", status: "read" },
    { id: 3, sender: "them", text: "I see we both enjoy traveling. Which was your last trip?", time: "10:35 AM", status: "read" },
    { id: 4, sender: "me", text: "I went to Bali recently. How about you?", time: "10:40 AM", status: "read" },
    { id: 5, sender: "them", text: "I would love to meet your family.", time: "10:45 AM", status: "delivered" }
];

const AI_SUGGESTIONS: string[] = [
    "I would love that. How about this weekend?",
    "Let's have a quick video call first?",
    "Sure, I will share my parents' contact details."
];

const MessagesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("All Chats");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedChatId, setSelectedChatId] = useState<number>(1);
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
    const [inputValue, setInputValue] = useState<string>("");
    const [chatStatus, setChatStatus] = useState<string>("accepted");
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [showFamilyModal, setShowFamilyModal] = useState<boolean>(false);
    const [showMeetingModal, setShowMeetingModal] = useState<boolean>(false);

    // Sidebar Resizing State
    const [sidebarWidth, setSidebarWidth] = useState<number>(320);
    const [isResizing, setIsResizing] = useState<boolean>(false);

    // Safety
    const [showSafetyWarning, setShowSafetyWarning] = useState<boolean>(true);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const activeChat = MOCK_CHATS.find(c => c.id === selectedChatId);

    const tabs = [
        { id: "All Chats", label: "All Chats", icon: "💬" },
        { id: "Unread", label: "Unread", icon: "🔴" },
        { id: "Interests Received", label: "Interests", icon: "❤️" },
        { id: "Family Discussions", label: "Family", icon: "👥" }
    ];

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

    const handleSuggestionClick = (text: string) => {
        setInputValue(text);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (activeChat) {
            setChatStatus(activeChat.status);
            if (activeChat.id === 1) setMessages(MOCK_MESSAGES);
            else setMessages([]);
        }
    }, [selectedChatId, activeChat]);

    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e: MouseEvent) => {
        if (isResizing) {
            const newWidth = Math.max(280, Math.min(e.clientX, 500));
            setSidebarWidth(newWidth);
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    const filteredChats = MOCK_CHATS.filter(chat => {
        let matchesTab = activeTab === "All Chats" || chat.category === activeTab;
        if (activeTab === "Unread") matchesTab = chat.unread > 0;
        if (activeTab === "Interests Received") matchesTab = chat.category === "Interests Received" || chat.category === "Interests Sent";
        const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="msg-container glass-panel">
            <div className="msg-sidebar" style={{ width: `${sidebarWidth}px` }}>
                <div className="msg-sidebar-header">
                    <h2>Messages</h2>
                    <div className="msg-search-wrap">
                        <svg className="msg-search-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="msg-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`msg-tab ${activeTab === tab.id ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="msg-tab-icon">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="msg-chat-list">
                    {filteredChats.map(chat => (
                        <div
                            key={chat.id}
                            className={`msg-chat-item ${selectedChatId === chat.id ? "active" : ""}`}
                            onClick={() => setSelectedChatId(chat.id)}
                        >
                            <div className="msg-chat-avatar-wrap">
                                <img src={chat.avatar} alt={chat.name} className="msg-chat-avatar" />
                                {chat.online && <span className="msg-online-indicator"></span>}
                            </div>
                            <div className="msg-chat-details">
                                <div className="msg-row">
                                    <h4 className={`msg-chat-name ${chat.unread > 0 ? 'unread-bold' : ''}`}>
                                        {chat.pinned && <span className="msg-pin-icon">📍</span>}
                                        {chat.name}
                                    </h4>
                                    <span className={`msg-chat-time ${chat.unread > 0 ? 'unread-time' : ''}`}>
                                        {chat.time}
                                    </span>
                                </div>
                                <div className="msg-row msg-chat-preview-row">
                                    <p className={`msg-chat-lastmsg ${chat.unread > 0 ? 'unread-bold' : ''}`}>
                                        {chat.lastMessage}
                                    </p>
                                    {chat.unread > 0 && (
                                        <span className="msg-unread-badge">{chat.unread}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={`msg-sidebar-resizer ${isResizing ? 'resizing' : ''}`}
                onMouseDown={startResizing}
            />

            {activeChat ? (
                <div className="msg-main-panel">
                    <div className="msg-chat-header">
                        <div className="msg-header-info">
                            <img src={activeChat.avatar} alt={activeChat.name} className="msg-header-avatar" />
                            <div>
                                <h3 className="msg-header-name">{activeChat.name}</h3>
                                <p className="msg-header-status">
                                    {activeChat.age && `${activeChat.age} yrs • `}
                                    {activeChat.city}
                                    {activeChat.online ? <span className="online-text"> Online</span> : ''}
                                </p>
                            </div>
                            {activeChat.compatibility !== "N/A" && (
                                <div className="msg-header-compat">
                                    <span className="compat-score">{activeChat.compatibility}</span>
                                    <span className="compat-label">Compatibility</span>
                                </div>
                            )}
                        </div>
                        <div className="msg-header-actions">
                            <button className="msg-icon-btn" title="View Profile">👁️</button>
                            <div className="msg-more-wrap">
                                <button className="msg-icon-btn" onClick={() => setShowOptions(!showOptions)}>⋮</button>
                                {showOptions && (
                                    <div className="msg-dropdown">
                                        <button onClick={() => setShowFamilyModal(true)}>Introduce Family</button>
                                        <button onClick={() => setShowMeetingModal(true)}>Meet Planner</button>
                                        <button>Request Kundali Match</button>
                                        <button>Mute Notifications</button>
                                        <button>Pin to Top</button>
                                        <button>View Shared Interests</button>
                                        <div className="msg-dropdown-divider"></div>
                                        <button className="danger-text">Block User</button>
                                        <button className="danger-text">Report Profile</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {activeChat.category !== "Family Discussions" && (
                        <div className="msg-profile-snapshot">
                            <div className="snap-info">
                                <strong>Education:</strong> {activeChat.education}
                            </div>
                            <div className="snap-info">
                                <strong>Profession:</strong> {activeChat.profession}
                            </div>
                            {activeChat.sharedInterests.length > 0 && (
                                <div className="snap-info">
                                    <strong>Shared:</strong> {activeChat.sharedInterests.join(", ")}
                                </div>
                            )}
                        </div>
                    )}

                    {showSafetyWarning && (
                        <div className="msg-safety-banner">
                            <span className="safety-icon">🛡️</span>
                            Safety Tip: Never share financial information. Report suspicious behavior.
                            <button className="safety-close" onClick={() => setShowSafetyWarning(false)}>✖</button>
                        </div>
                    )}

                    <div className="msg-chat-area">
                        {chatStatus === "pending" ? (
                            <div className="msg-interest-overlay">
                                <div className="interest-card">
                                    <h3>Interest Request Received</h3>
                                    <p>{activeChat.name} wants to connect with you.</p>
                                    <div className="interest-actions">
                                        <button className="btn-accept" onClick={() => setChatStatus("accepted")}>Accept</button>
                                        <button className="btn-decline">Decline</button>
                                    </div>
                                </div>
                            </div>
                        ) : chatStatus === "sent" ? (
                            <div className="msg-interest-overlay">
                                <div className="interest-card">
                                    <h3>Interest Request Sent</h3>
                                    <p>Waiting for {activeChat.name} to accept your request.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="msg-messages-list">
                                {messages.length === 0 ? (
                                    <div className="msg-conversation-starters">
                                        <h4>Conversation Starters</h4>
                                        <button onClick={() => setInputValue("Hello! I liked your profile and would like to know more about you.")}>
                                            "Hello! I liked your profile and would like to know more about you."
                                        </button>
                                        <button onClick={() => setInputValue("Our profiles seem compatible. Would you like to connect?")}>
                                            "Our profiles seem compatible. Would you like to connect?"
                                        </button>
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div key={msg.id} className={`msg-bubble-wrap ${msg.sender}`}>
                                            <div className={`msg-bubble ${msg.sender}`}>
                                                <p>{msg.text}</p>
                                                <div className="msg-meta">
                                                    <span className="msg-time">{msg.time}</span>
                                                    {msg.sender === "me" && (
                                                        <span className={`msg-receipt ${msg.status}`}>
                                                            {msg.status === "read" ? "✓✓" : msg.status === "delivered" ? "✓✓" : "✓"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {chatStatus === "accepted" && (
                        <div className="msg-input-container">
                            {messages.length > 0 && messages[messages.length - 1].sender === "them" && (
                                <div className="msg-ai-suggestions">
                                    <span className="ai-icon">✨ Smart Replies:</span>
                                    {AI_SUGGESTIONS.map((sug, i) => (
                                        <button key={i} onClick={() => handleSuggestionClick(sug)} className="ai-pill">{sug}</button>
                                    ))}
                                </div>
                            )}

                            <form className="msg-input-bar" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="msg-input"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <button type="button" className="msg-action-btn">🙂</button>
                                {inputValue.trim() && (
                                    <button type="submit" className="msg-send-btn">➤</button>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <div className="msg-main-panel empty">
                    <div className="empty-state">
                        <div className="empty-icon">💬</div>
                        <h3>Select a conversation</h3>
                        <p>Choose a chat from the left or send a new interest to start talking.</p>
                    </div>
                </div>
            )}

            {showFamilyModal && (
                <div className="msg-modal-overlay">
                    <div className="msg-modal">
                        <h3>Introduce Family</h3>
                        <p>Involve your parents in the conversation.</p>
                        <button className="modal-btn">Share Parent Contact</button>
                        <button className="modal-btn">Invite to Group Chat</button>
                        <button className="modal-btn">Schedule Family Call</button>
                        <button className="modal-close" onClick={() => setShowFamilyModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {showMeetingModal && (
                <div className="msg-modal-overlay">
                    <div className="msg-modal">
                        <h3>Meeting Planner</h3>
                        <p>Plan your next virtual or physical meet.</p>
                        <input type="date" className="modal-input" />
                        <input type="time" className="modal-input" />
                        <button className="modal-btn submit">Schedule Meeting</button>
                        <button className="modal-close" onClick={() => setShowMeetingModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
