import React, { useState } from 'react';
import Button from '../ui/button';
import Input from '../ui/input';

const GitHubRepoModal = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [error, setError] = useState('');

  const validateGitHubUrl = (url) => {
    // Simple GitHub URL validation regex
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    return githubRegex.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      setError('Repository URL is required');
      return;
    }
    
    if (!validateGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }
    
    // Process the form data
    console.log('Repository:', repoUrl);
    console.log('Branch:', branch);
    
    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-md overflow-hidden backdrop-blur-lg bg-opacity-90">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Add GitHub Repository</h2>
          <p className="text-slate-300 mb-6">
            Enter the GitHub repository URL and branch you want to scan.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Repository URL"
                type="text"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => {
                  setRepoUrl(e.target.value);
                  setError('');
                }}
                error={error}
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
              />
              
              <Input
                label="Branch"
                type="text"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-500"
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Add Repository
                </Button>
              </div>
            </div>
          </form>
        </div>
        
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default GitHubRepoModal;