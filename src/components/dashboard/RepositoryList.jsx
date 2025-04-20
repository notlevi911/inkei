import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import Button from '../ui/button';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      name: 'zenith-frontend',
      url: 'https://github.com/zenith/zenith-frontend',
      branch: 'main',
      lastScanned: '2023-12-01T09:30:00',
      status: 'completed',
    },
    {
      id: 2,
      name: 'zenith-api',
      url: 'https://github.com/zenith/zenith-api',
      branch: 'develop',
      lastScanned: '2023-11-28T15:45:00',
      status: 'completed',
    },
    {
      id: 3,
      name: 'zenith-docs',
      url: 'https://github.com/zenith/zenith-docs',
      branch: 'main',
      lastScanned: null,
      status: 'pending',
    }
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400">
            Completed
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400">
            In Progress
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-500/20 text-yellow-400">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-400">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700 text-slate-400">
            Unknown
          </span>
        );
    }
  };

  const handleRemoveRepository = (id) => {
    setRepositories(repositories.filter(repo => repo.id !== id));
  };

  const handleScanRepository = (id) => {
    setRepositories(repositories.map(repo => 
      repo.id === id 
        ? { ...repo, status: 'in_progress' } 
        : repo
    ));
    
    // Simulate scan completion after 3 seconds
    setTimeout(() => {
      setRepositories(repositories.map(repo => 
        repo.id === id 
          ? { 
              ...repo, 
              status: 'completed',
              lastScanned: new Date().toISOString()
            } 
          : repo
      ));
    }, 3000);
  };

  if (repositories.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-none">
        <CardContent className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No repositories found</h3>
          <p className="text-slate-400 mb-4">
            Add your first GitHub repository to get started with scanning and analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <Card key={repo.id} className="bg-white rounded-lg border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold text-slate-800">{repo.name}</h3>
                    <div className="ml-2">
                      {getStatusBadge(repo.status)}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{repo.url}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      Branch: {repo.branch}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      Last Scanned: {formatDate(repo.lastScanned)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-2">
                <Button 
                  variant="outline" 
                  size="small"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => handleScanRepository(repo.id)}
                  disabled={repo.status === 'in_progress'}
                >
                  {repo.status === 'in_progress' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scanning...
                    </span>
                  ) : (
                    'Scan Now'
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="small"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleRemoveRepository(repo.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RepositoryList;