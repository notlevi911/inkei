import React from 'react';
import { Card, CardContent } from '../ui/card';

const WelcomeCard = () => {
  return (
    <Card className="bg-white shadow-md border border-slate-200 mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to the Project Dashboard</h3>
            <p className="text-slate-600 mb-4">
              This dashboard allows you to scan GitHub repositories, upload documentation,
              and generate sprint plans using AI assistance. Get started by adding a repository
              or uploading documentation files.
            </p>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-slate-600">
                  <strong>Tip:</strong> For best results, make sure your GitHub repository has detailed 
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