import React, { useState, useEffect, useRef } from 'react';

interface Message {
    message: string;
    sender_id: string;
    sender_name: string;
    sender_status: string;
    timestamp: string;
}

const ChatComponent: React.FC = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [currentUser, setCurrentUser] = useState<string>(''); // Mevcut kullanıcı ID'si başlangıçta boş

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // User ID'yi localStorage'den al
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setCurrentUser(storedUserId);
        }

        const newSocket = new WebSocket('ws://172.25.80.1:8000/ws/chat/8b5179ea-6ffc-42ed-8315-cee53605b0d7/');
        setSocket(newSocket);

        newSocket.onopen = () => {
            console.log('WebSocket bağlantısı kuruldu.');
        };

        newSocket.onmessage = (event) => {
            console.log('WebSocket mesajı alındı:', event.data);
            const data = JSON.parse(event.data);

            if (data.message && data.sender_id) {
                setMessages(prevMessages => {
                    const existingMessage = prevMessages.find(msg => msg.timestamp === data.timestamp && msg.sender_id === data.sender_id);
                    if (existingMessage) {
                        return prevMessages;
                    }
                    const newMessages = [
                        ...prevMessages,
                        {
                            message: data.message,
                            sender_id: data.sender_id,
                            sender_name: data.sender_name || 'Bilinmeyen', // Gönderenin adı
                            sender_status: data.sender_status || 'Çevrimdışı', // Gönderenin durumu
                            timestamp: data.timestamp || new Date().toISOString()
                        }
                    ];
                    newMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                    return newMessages;
                });

                if (messagesEndRef.current) {
                    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                }
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

    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && currentMessage.trim() !== '') {
            const messageData = {
                message: currentMessage,
                sender_id: currentUser,
                sender_name: 'Benim Adım', // Mevcut kullanıcının adı
                sender_status: 'Çevrimiçi', // Mevcut kullanıcının durumu
                timestamp: new Date().toISOString()
            };
            socket.send(JSON.stringify(messageData));
            setCurrentMessage(''); // Mesaj gönderildikten sonra input alanını temizle
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
                            justifyContent: msg.sender_id === currentUser ? 'flex-end' : 'flex-start', 
                            marginBottom: '10px' 
                        }}
                    >
                        <div style={{ 
                            maxWidth: '60%', 
                            padding: '10px', 
                            borderRadius: '10px', 
                            backgroundColor: msg.sender_id === currentUser ? '#DCF8C6' : '#FFF', 
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}>
                            <strong>{msg.sender_name} {msg.sender_status === 'Çevrimiçi' ? '🟢' : '🔴'}:</strong>
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
