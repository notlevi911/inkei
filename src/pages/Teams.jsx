import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

// Define available rooms (could be fetched from backend in future)
const publicRooms = ['general', 'random', 'default'];
const adminRooms = ['admin-lounge', 'ceo-chat'];

const Teams = () => {
  const [roomId, setRoomId] = useState('default');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState('Product Manager');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('chatHistory', (history) => {
      setMessages(history);
    });

    socket.on('notification', (note) => {
      setMessages((prev) => [...prev, { system: true, message: note }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
      socket.off('notification');
    };
  }, []);

  const joinRoom = () => {
    if (!user.trim() || !roomId.trim()) return;
    socket.emit('joinRoom', { roomId, user, role });
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomId, user });
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { roomId, user, message });
      setMessage('');
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Zenith Teams</h1>

        {/* Room List Display */}
        <div className="bg-slate-800 p-4 rounded mb-4 text-sm space-y-2">
          <div>
            <span className="font-semibold text-indigo-400">Public Rooms:</span>{' '}
            {publicRooms.join(', ')}
          </div>
          <div>
            <span className="font-semibold text-red-400">Admin Rooms:</span>{' '}
            {adminRooms.join(', ')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="p-2 rounded bg-slate-100 text-black"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="p-2 rounded bg-slate-100 text-black"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mt-2 p-2 rounded bg-slate-100 text-black"
          >
            <option value="CEO">CEO</option>
            <option value="Senior Manager">Senior Manager</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button onClick={joinRoom} className="flex-1 py-2 bg-green-600 rounded hover:bg-green-700">
            Join
          </button>
          <button onClick={leaveRoom} className="flex-1 py-2 bg-red-600 rounded hover:bg-red-700">
            Leave
          </button>
        </div>

        <div ref={chatBoxRef} className="h-64 overflow-y-auto bg-slate-800 p-4 rounded space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="text-sm">
              {msg.system ? (
                <em className="text-slate-400">{msg.message}</em>
              ) : (
                <div>
                  <span className="font-semibold text-indigo-300">{msg.user}</span>: {msg.message}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <input
            className="flex-1 p-2 rounded bg-slate-100 text-black"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teams;
