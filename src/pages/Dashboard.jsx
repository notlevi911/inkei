import React, { useState } from 'react';
import Button from '../components/ui/button';
import GitHubRepoModal from '../components/dashboard/GitHubRepoModal';
import DocumentUploaderModal from '../components/dashboard/DocumentUploaderModal';
import ApiEndpoints from '../components/dashboard/ApiEndpoints';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import RepositoryList from '../components/dashboard/RepositoryList';
import DashboardLayout from '../components/layout/DashboardLayout';
import DocumentList from '../components/dashboard/DocumentList';

const Dashboard = () => {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  return (
    <DashboardLayout 
      title="Project Dashboard" 
      description="Manage your projects, scan repositories, and generate documentation with AI."
    >
      <section className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WelcomeCard />
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 mt-8">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => setIsGitHubModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add GitHub Repository
            </Button>
            <Button 
              variant="outline" 
              size="large"
              className="border-indigo-500 text-indigo-400 hover:bg-indigo-900/30"
              onClick={() => setIsDocumentModalOpen(true)}
            >
              Upload Documentation
            </Button>
          </div>

          <div className="flex justify-center mb-12">
            <Button 
              variant="primary" 
              size="large"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-700/20"
            >
              Generate Sprint
            </Button>
          </div>
        </div>
      </section>

      <section id="repositories" className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Repositories</h2>
          <RepositoryList />
        </div>
      </section>
      
      <section id="documents" className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">Documents</h2>
          <DocumentList />
        </div>
      </section>

      <section id="api" className="py-12 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
          <ApiEndpoints />
        </div>
      </section>

      {/* Modals */}
      <GitHubRepoModal 
        isOpen={isGitHubModalOpen} 
        onClose={() => setIsGitHubModalOpen(false)} 
      />
      <DocumentUploaderModal 
        isOpen={isDocumentModalOpen} 
        onClose={() => setIsDocumentModalOpen(false)} 
      />
    </DashboardLayout>
  );
};

export default Dashboard;