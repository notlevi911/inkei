import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';

const ApiEndpoints = () => {
  const endpoints = [
    {
      id: 1,
      method: 'GET',
      endpoint: '/api/v1/repositories',
      description: 'Retrieve a list of all repositories',
      parameters: [],
      responseExample: '{ "repositories": [ ... ] }'
    },
    {
      id: 2,
      method: 'POST',
      endpoint: '/api/v1/repositories/scan',
      description: 'Scan a GitHub repository and analyze its content',
      parameters: [
        { name: 'url', type: 'string', required: true, description: 'GitHub repository URL' },
        { name: 'branch', type: 'string', required: false, description: 'Repository branch (default: main)' }
      ],
      responseExample: '{ "scan_id": "abc123", "status": "in_progress" }'
    },
    {
      id: 3,
      method: 'GET',
      endpoint: '/api/v1/scan/:id',
      description: 'Get the status and results of a repository scan',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Scan ID' }
      ],
      responseExample: '{ "scan_id": "abc123", "status": "completed", "results": { ... } }'
    },
    {
      id: 4,
      method: 'POST',
      endpoint: '/api/v1/documents/upload',
      description: 'Upload documentation files for AI processing',
      parameters: [
        { name: 'files', type: 'array', required: true, description: 'Array of files to upload' }
      ],
      responseExample: '{ "upload_id": "def456", "status": "success", "files_processed": 3 }'
    },
    {
      id: 5,
      method: 'POST',
      endpoint: '/api/v1/sprint/generate',
      description: 'Generate a sprint plan based on repository analysis',
      parameters: [
        { name: 'repository_id', type: 'string', required: true, description: 'Repository ID' },
        { name: 'duration', type: 'integer', required: true, description: 'Sprint duration in days' },
        { name: 'team_size', type: 'integer', required: true, description: 'Number of team members' }
      ],
      responseExample: '{ "sprint_id": "ghi789", "tasks": [ ... ], "estimated_completion": "2023-12-31" }'
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
    </div>
  );
};

export default ApiEndpoints;