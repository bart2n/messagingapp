import React, { useState, useEffect, useRef } from 'react';

interface Message {
    message: string;
    sender_id?: string;
    sender_name?: string;
    sender_status?: string;
    timestamp: string;
}

const ChatComponent: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [currentUsername, setCurrentUsername] = useState<string>('');

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setCurrentUsername(storedUsername);
        }

        const roomId = '76dba463-6388-4236-8d02-8f24f6d82ae3';
        const newSocket = new WebSocket('ws://localhost:8000/ws/chat/' + roomId + '/');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu.');
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                setMessages(prevMessages => {
                    const existingMessage = prevMessages.find(msg => msg.timestamp === data.timestamp && msg.sender_name === data.sender_name);
                    if (existingMessage) {
                        return prevMessages;
                    }

                    const newMessages = [
                        ...prevMessages,
                        {
                            message: data.message,
                            sender_id: data.sender_id || 'Bilinmeyen',
                            sender_name: data.sender_name || 'Bilinmeyen',
                            sender_status: data.sender_status || 'Çevrimdışı',
                            timestamp: data.timestamp || new Date().toISOString()
                        }
                    ];
                    newMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                    return newMessages;
                });
            }
        };

        newSocket.onerror = (error) => {
            console.log('WebSocket hatası:', error);
        };

        newSocket.onclose = () => {
            console.log('WebSocket bağlantısı kapatıldı.');
        };

        const pingInterval = setInterval(() => {
            if (newSocket.readyState === WebSocket.OPEN) {
                newSocket.send(JSON.stringify({ type: 'ping' }));
            }
        }, 30000);

        return () => {
            clearInterval(pingInterval);
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && currentMessage.trim() !== '') {
            const messageData = {
                message: currentMessage,
                sender_name: currentUsername,
                sender_status: 'Çevrimiçi',
                timestamp: new Date().toISOString()
            };
            socket.send(JSON.stringify(messageData));
            setCurrentMessage('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', borderRadius: '10px' }}>
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            display: 'flex', 
                            justifyContent: msg.sender_name === currentUsername ? 'flex-end' : 'flex-start', 
                            marginBottom: '10px' 
                        }}
                    >
                        <div style={{ 
                            maxWidth: '60%', 
                            padding: '10px', 
                            borderRadius: '10px', 
                            backgroundColor: msg.sender_name === currentUsername ? '#DCF8C6' : '#FFF', 
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}>
                            <strong>{msg.sender_name} {msg.sender_status === 'Çevrimdışı' ? '🔴' : '🟢'}:</strong>
                            <p style={{ margin: '5px 0' }}>{msg.message}</p>
                            <em style={{ fontSize: '0.8em', color: '#888' }}>{new Date(msg.timestamp).toLocaleTimeString()}</em>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ marginTop: '10px', display: 'flex' }}>
                <input 
                    type="text" 
                    value={currentMessage} 
                    onChange={(e) => setCurrentMessage(e.target.value)} 
                    onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
                    placeholder="Mesajınızı yazın..." 
                    style={{ 
                        flex: 1, 
                        padding: '10px', 
                        borderRadius: '10px', 
                        border: '1px solid #ccc', 
                        marginRight: '10px' 
                    }}
                />
                <button onClick={sendMessage} style={{ padding: '10px 20px', borderRadius: '10px', backgroundColor: '#007BFF', color: '#FFF', border: 'none' }}>
                    Gönder
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
