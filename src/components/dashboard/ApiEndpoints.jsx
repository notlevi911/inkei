import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';

const ApiEndpoints = () => {
  const endpoints = [
    {
      id: 1,
      method: 'POST',
      endpoint: '/api/auth/signup',
      description: 'Register a new user account',
      parameters: [
        { name: 'fullName', type: 'string', required: true, description: 'User\'s full name' },
        { name: 'email', type: 'string', required: true, description: 'User\'s email address' },
        { name: 'password', type: 'string', required: true, description: 'User\'s password' },
        { name: 'role', type: 'string', required: true, description: 'User role (CEO, Senior Manager, Product Manager)' }
      ],
      responseExample: '{\n  "message": "User created successfully!"\n}'
    },
    {
      id: 2,
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'Authenticate user and get access token',
      parameters: [
        { name: 'email', type: 'string', required: true, description: 'User\'s email address' },
        { name: 'password', type: 'string', required: true, description: 'User\'s password' },
        { name: 'role', type: 'string', required: true, description: 'User role (CEO, Senior Manager, Product Manager)' }
      ],
      responseExample: '{\n  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",\n  "user": {\n    "id": "65ff245a8b1c234d5e6f78a9",\n    "fullName": "John Doe",\n    "email": "john@example.com",\n    "role": "CEO"\n  }\n}'
    },
    {
      id: 3,
      method: 'Socket',
      endpoint: 'joinRoom',
      description: 'Join a chat room (Socket.IO event)',
      parameters: [
        { name: 'roomId', type: 'string', required: true, description: 'ID of the room to join' },
        { name: 'user', type: 'string', required: true, description: 'Username of the joining user' },
        { name: 'role', type: 'string', required: true, description: 'User role (CEO, Senior Manager, Product Manager)' }
      ],
      responseExample: '// Event: chatHistory\n[\n  { "user": "Jane", "message": "Hello everyone", "timestamp": "2025-04-18T14:30:00Z" },\n  { "user": "John", "message": "Hi Jane!", "timestamp": "2025-04-18T14:31:00Z" }\n]'
    },
    {
      id: 4,
      method: 'Socket',
      endpoint: 'sendMessage',
      description: 'Send a message to a chat room (Socket.IO event)',
      parameters: [
        { name: 'roomId', type: 'string', required: true, description: 'ID of the target room' },
        { name: 'user', type: 'string', required: true, description: 'Username of the message sender' },
        { name: 'message', type: 'string', required: true, description: 'Message content' }
      ],
      responseExample: '// Event: receiveMessage\n{\n  "user": "John",\n  "message": "Hello everyone!",\n  "timestamp": "2025-04-20T10:15:30Z"\n}'
    },
    {
      id: 5,
      method: 'Socket',
      endpoint: 'leaveRoom',
      description: 'Leave a chat room (Socket.IO event)',
      parameters: [
        { name: 'roomId', type: 'string', required: true, description: 'ID of the room to leave' },
        { name: 'user', type: 'string', required: true, description: 'Username of the leaving user' }
      ],
      responseExample: '// Event: notification\n"John left general"'
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'bg-green-100 text-green-800';
      case 'POST':
        return 'bg-blue-100 text-blue-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      case 'Socket':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {endpoints.map((endpoint) => (
        <Card key={endpoint.id} className="overflow-hidden border border-slate-200">
          <CardHeader className="p-4 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <h3 className="font-mono text-sm sm:text-base font-medium text-slate-900">
                {endpoint.endpoint}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mt-2 sm:mt-0">
              {endpoint.description}
            </p>
          </CardHeader>
          <CardContent className="p-4">
            {endpoint.parameters.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-900 mb-2">Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Required</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {endpoint.parameters.map((param, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-mono text-slate-900">{param.name}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-600">{param.type}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-slate-600">
                            {param.required ? (
                              <span className="text-green-600">Yes</span>
                            ) : (
                              <span className="text-slate-400">No</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-sm text-slate-600">{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">Response Example</h4>
              <pre className="bg-slate-800 text-slate-200 p-3 rounded-md overflow-x-auto text-xs font-mono">
                {endpoint.responseExample}
              </pre>
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border border-slate-200 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium text-slate-900 mb-4">Authentication Note</h3>
          <p className="text-slate-700 mb-3">
            JWT Authentication is used for protected routes. After login, include the token in the Authorization header:
          </p>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded-md overflow-x-auto text-xs font-mono">
            Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
          </pre>
          
          <h3 className="text-lg font-medium text-slate-900 mt-6 mb-4">Socket.IO Connection</h3>
          <p className="text-slate-700 mb-3">
            To connect to the Socket.IO server for real-time communication:
          </p>
          <pre className="bg-slate-800 text-slate-200 p-3 rounded-md overflow-x-auto text-xs font-mono">
            {`import io from 'socket.io-client';
const socket = io('http://localhost:5000');

// Listen for events
socket.on('receiveMessage', (message) => {
  console.log('New message:', message);
});

// Emit events
socket.emit('joinRoom', { roomId: 'general', user: 'John', role: 'CEO' });`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiEndpoints;