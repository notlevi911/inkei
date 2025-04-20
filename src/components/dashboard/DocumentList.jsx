import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import Button from '../ui/button';

const DocumentList = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'API Documentation.md',
      uploadDate: '2023-12-02T10:15:00',
      size: 256000, // bytes
      status: 'processed'
    },
    {
      id: 2,
      name: 'Architecture Overview.md',
      uploadDate: '2023-12-01T14:30:00',
      size: 128000, // bytes
      status: 'processed'
    },
    {
      id: 3,
      name: 'Development Guidelines.md',
      uploadDate: '2023-11-29T09:45:00',
      size: 192000, // bytes
      status: 'processing'
    }
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'processed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-500/20 text-green-400">
            Processed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500/20 text-blue-400">
            Processing
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

  const handleRemoveDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleViewDocument = (id) => {
    // In a real app, this would open the document for viewing
    console.log(`Viewing document ${id}`);
  };

  if (documents.length === 0) {
    return (
      <Card className="bg-slate-900/50 border-none">
        <CardContent className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-white mb-2">No documents found</h3>
          <p className="text-slate-400 mb-4">
            Upload documentation files to feed information to the AI manager.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="bg-white rounded-lg border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold text-slate-800">{doc.name}</h3>
                    <div className="ml-2">
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      Uploaded: {formatDate(doc.uploadDate)}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      Size: {formatFileSize(doc.size)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex mt-4 md:mt-0 space-x-2">
                <Button 
                  variant="outline" 
                  size="small"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => handleViewDocument(doc.id)}
                >
                  View
                </Button>
                <Button 
                  variant="ghost" 
                  size="small"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleRemoveDocument(doc.id)}
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

export default DocumentList;