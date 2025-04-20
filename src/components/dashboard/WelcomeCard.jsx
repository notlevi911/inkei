import React from 'react';
import { Card, CardContent } from '../ui/card';

const WelcomeCard = () => {
  return (
    <Card className="relative border-0 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/20 z-0" />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-600" />
      
      <CardContent className="relative z-10 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-3">
              Welcome to the Project Dashboard
            </h3>
            <p className="text-slate-300 mb-6">
              This dashboard allows you to scan GitHub repositories, upload documentation,
              and generate sprint plans using AI assistance. Get started by adding a repository
              or uploading documentation files.
            </p>
            
            <div className="relative bg-white/10 p-5 rounded-lg border border-white/10 backdrop-blur-sm">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-amber-400/20 mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-amber-400">Tip:</span> For best results, make sure your GitHub repository has detailed 
                  README files and your documentation covers key aspects of your project structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;