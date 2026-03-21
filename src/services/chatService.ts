import api from "./api";

export interface Message {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
  status: "sent" | "delivered" | "read";
  type?: "text" | "location" | "image";
  locationName?: string;
  locationAddr?: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  lastMessage: string;
  time: string;
  unread: number;
  lastSeen?: string;
  lastInteraction: number;
  isAccepted: boolean;
}

const STORAGE_KEY = "sv_chat_messages";
const CONTACTS_KEY = "sv_chat_contacts";

const initialContacts: Contact[] = [
  {
    id: "1",
    name: "Sayali Sontakke",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
    status: "online",
    lastMessage: "I just found this cool cafe...",
    time: '19:00',
    unread: 0,
    lastSeen: '19:00',
    lastInteraction: Date.now() - 100000,
    isAccepted: true
  },
  {
    id: "2",
    name: "Rohit Agarwal",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    status: "offline",
    lastMessage: "😊",
    time: "18:59",
    unread: 0,
    lastSeen: "Yesterday",
    lastInteraction: Date.now() - 500000,
    isAccepted: true
  },
  {
      id: '3',
      name: 'Pete Jackson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      status: 'online',
      lastMessage: "You: Happy to hear that!",
      time: '11:13',
      unread: 0,
      lastInteraction: Date.now() - 1000000,
      isAccepted: false
  },
];

const initialMessages: Record<string, Message[]> = {
  "1": [
    { id: "1", text: "Hey Sherry, What are you up to tonight?", sender: "them", time: "18:56", status: "read" },
    { id: "2", text: "Hey, Sayali. Nothing, You?", sender: "me", time: "18:57", status: "read" },
    { id: "3", text: "I just found this cool cafe down the street, check it out!", sender: "them", time: "18:57", status: "read" },
    { 
        id: "4", 
        text: "", 
        type: 'location',
        locationName: "Ritz Cafe, San Fransico",
        locationAddr: "123 Sanctuary Street, SF",
        sender: 'them', 
        time: '18:57', 
        status: 'read' 
    }
  ],
};

class ChatService {
  private getMessages(): Record<string, Message[]> {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialMessages;
  }

  private saveMessages(messages: Record<string, Message[]>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }

  private getContacts(): Contact[] {
    const stored = localStorage.getItem(CONTACTS_KEY);
    return stored ? JSON.parse(stored) : initialContacts;
  }

  private saveContacts(contacts: Contact[]) {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }

  async fetchContacts(): Promise<Contact[]> {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));
    return this.getContacts();
  }

  async fetchMessages(contactId: string): Promise<Message[]> {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 500));
    const allMessages = this.getMessages();
    return allMessages[contactId] || [];
  }

  async sendMessage(contactId: string, text: string, type: "text" | "location" | "image" = "text"): Promise<Message> {
    const allMessages = this.getMessages();
    const contacts = this.getContacts();

    const timestamp = new Date();
    const timeStr = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      time: timeStr,
      status: "sent",
      type
    };

    if (!allMessages[contactId]) allMessages[contactId] = [];
    allMessages[contactId].push(newMessage);
    this.saveMessages(allMessages);

    // Update contacts list to move to top and set last message
    const updatedContacts = contacts.map(c => 
      c.id === contactId 
        ? { ...c, lastMessage: `You: ${text}`, time: timeStr, lastInteraction: Date.now() } 
        : c
    );
    this.saveContacts(updatedContacts);

    return newMessage;
  }

  async markAsRead(contactId: string): Promise<void> {
    const contacts = this.getContacts();
    const updated = contacts.map(c => 
      c.id === contactId ? { ...c, unread: 0 } : c
    );
    this.saveContacts(updated);
  }

  async getTotalUnreadCount(): Promise<number> {
    const contacts = this.getContacts();
    return contacts.reduce((total, contact) => total + (contact.unread || 0), 0);
  }

  // Real-world: This would be via WebSockets or SSE
  onMessageReceived(callback: (contactId: string, message: Message) => void) {
    // Mocking an incoming message after 3 seconds of sending
    // For a real-world app, this would be your Socket.io/Supabase hook
  }
}

export const chatService = new ChatService();
