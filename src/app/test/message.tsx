'use client';

import {useEffect, useState} from 'react';
import {getSocket, initializeSocket} from "@/services/socket";

type Message = {
    user: string
    message: string
}

export default function Messages() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isConnected) {
            const socket = getSocket();

            // Listen for chat messages
            socket.on('chatMessage', (user: string, message: string) => {
                setMessages((prev) => [...prev, {user, message}]);
            });

            return () => {
                socket.off('chatMessage');
            };
        }
    }, [isConnected]);

    const handleConnect = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            initializeSocket(username);
            setIsConnected(true);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && isConnected) {
            const socket = getSocket();
            socket.emit('chatMessage', message);
            setMessage('');
        }
    };

    return (
        <main className="min-h-screen p-8">
            {!isConnected ? (
                <div className="max-w-md mx-auto">
                    <form onSubmit={handleConnect} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Enter your username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Username"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Connect
                        </button>
                    </form>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white shadow rounded-lg">
                        <div className="h-96 p-6 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-gray-700">
                                        <span
                                            className={msg.user == username ? "text-red-500" : ''}>{msg.user}</span>: {msg.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t p-4">
                            <form onSubmit={handleSendMessage} className="flex space-x-4">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Type a message..."
                                    required
                                />
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
