import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

// Initialize socket connection
const socket = io('http://localhost:5000');

const Teams = () => {
  const [roomCode, setRoomCode] = useState('');
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [currentRoomCode, setCurrentRoomCode] = useState('');
  const messageInputRef = useRef(null);
  const chatBoxRef = useRef(null);

  // Get user data from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserName(parsedUser.fullName || 'User');
    } else {
      setUserName('User-' + Math.floor(1000 + Math.random() * 9000));
    }
  }, []);

  // Socket event handlers
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

    socket.on('userList', (users) => {
      setConnectedUsers(users);
    });

    socket.on('roomJoined', ({ roomCode, success, message }) => {
      if (success) {
        setCurrentRoomCode(roomCode);
      } else {
        alert(message || 'Failed to join room');
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
      socket.off('notification');
      socket.off('userList');
      socket.off('roomJoined');
    };
  }, []);

  // Generate random 4-digit room code
  const generateRoomCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setRoomCode(newCode);
    return newCode;
  };

  // Join existing room
  const joinRoom = () => {
    if (!roomCode.trim() || roomCode.length !== 4) {
      alert('Please enter a valid 4-digit room code');
      return;
    }
    
    socket.emit('joinRoom', {
      roomId: roomCode,
      user: userName
    });
  };

  // Create a new room
  const createRoom = () => {
    const newRoomCode = generateRoomCode();
    
    socket.emit('createRoom', {
      roomId: newRoomCode,
      user: userName
    });
  };

  // Leave the current room
  const leaveRoom = () => {
    socket.emit('leaveRoom', {
      roomId: currentRoomCode,
      user: userName
    });
    
    setCurrentRoomCode('');
    setMessages([]);
    setConnectedUsers([]);
  };

  // Send a message in the current room
  const sendMessage = () => {
    if (message.trim() && currentRoomCode) {
      const messageObj = {
        roomId: currentRoomCode,
        user: userName,
        message,
        timestamp: new Date().toISOString()
      };
      
      socket.emit('sendMessage', messageObj);
      
      // Optimistically add message to state
      setMessages(prev => [...prev, { ...messageObj, isMine: true }]);
      setMessage('');
    }
  };

  // Format timestamps
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <h1 className="text-xl font-bold">Zenith Teams</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Dashboard</a>
              <a href="#" className="text-white font-medium bg-indigo-600 px-3 py-1 rounded-md shadow-sm hover:bg-indigo-500 transition-colors">Teams</a>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-800 font-bold">
                {userName ? userName.charAt(0).toUpperCase() : 'Z'}
              </div>
              <span className="ml-2 hidden md:inline text-white/90">{userName}</span>
            </div>
            
            {currentRoomCode && (
              <div className="flex items-center ml-4">
                <span className="bg-indigo-600/30 border border-indigo-500/30 backdrop-blur-sm px-3 py-1 rounded-l-md text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {currentRoomCode}
                </span>
                <button 
                  onClick={leaveRoom}
                  className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-r-md transition-colors text-white shadow-sm"
                >
                  Leave
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {!currentRoomCode ? (
          <div className="flex-1 flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all">
              <div className="text-center mb-8">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Join or Create a Room</h2>
                <p className="text-gray-600 mt-2">Connect with your team in real-time</p>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Code</label>
                  <input
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-3xl tracking-widest font-medium bg-white shadow-sm"
                    placeholder="0000"
                    maxLength={4}
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={joinRoom}
                    className="py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                    disabled={!roomCode || roomCode.length !== 4}
                  >
                    Join Room
                  </button>
                  <button
                    onClick={createRoom}
                    className="py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Create Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* User List - Left 1/3 */}
            <div className="w-1/3 bg-white shadow-md flex flex-col border-r border-gray-200">
              <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="font-semibold text-gray-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Participants
                </h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{connectedUsers.length} connected</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Room: {currentRoomCode}</span>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <ul className="divide-y divide-gray-100">
                  {connectedUsers.length === 0 ? (
                    <li className="py-8 text-center text-gray-500 italic">No users connected</li>
                  ) : (
                    connectedUsers.map((user, index) => (
                      <li key={index} className="flex items-center p-4 hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white font-medium shadow-sm mr-3">
                          {user.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user}</p>
                          <p className="text-xs text-gray-500">Active now</p>
                        </div>
                        {user === userName && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            You
                          </span>
                        )}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            
            {/* Chat Area - Right 2/3 */}
            <div className="w-2/3 flex flex-col bg-slate-50">
              {/* Messages */}
              <div 
                ref={chatBoxRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ 
                  backgroundImage: "url('https://web.whatsapp.com/img/bg-chat-tile-light_a4be8139b7aa2e3f3793.png')", 
                  backgroundRepeat: "repeat",
                  backgroundSize: "300px"
                }}
              >
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <div className="mb-4 flex items-center justify-center w-20 h-20 rounded-full bg-white/50 backdrop-blur-sm shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700">No messages yet</h3>
                    <p className="text-gray-500 mt-2">Start the conversation by sending a message</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isMine = msg.user === userName || msg.isMine;
                    
                    if (msg.system) {
                      return (
                        <div key={idx} className="flex justify-center">
                          <div className="bg-gray-200/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600 shadow-sm">
                            {msg.message}
                          </div>
                        </div>
                      );
                    }
                    
                    return (
                      <div 
                        key={idx} 
                        className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isMine && (
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-medium mr-2 mt-1 flex-shrink-0">
                            {msg.user?.charAt(0)?.toUpperCase() || '?'}
                          </div>
                        )}
                        <div className={`max-w-md rounded-2xl px-4 py-2.5 shadow-sm ${
                          isMine
                            ? 'bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-600/10 text-gray-800 rounded-br-none'
                            : 'bg-white border border-gray-200/50 text-gray-800 rounded-bl-none'
                        }`}>
                          {!isMine && (
                            <p className="text-xs font-semibold text-indigo-600 mb-1">{msg.user}</p>
                          )}
                          <p className="whitespace-pre-wrap">{msg.message}</p>
                          <p className="text-right text-xs text-gray-500 mt-1">
                            {formatTime(msg.timestamp || new Date().toISOString())}
                            {isMine && (
                              <span className="ml-1 text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 inline" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              
              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200 shadow-md">
                <div className="flex items-center bg-slate-50 rounded-full pl-4 pr-2 py-1 shadow-sm border border-gray-200">
                  <input
                    ref={messageInputRef}
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 border-none bg-transparent focus:outline-none focus:ring-0"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-indigo-600 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className={`p-2 rounded-full ${
                        message.trim()
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Teams;