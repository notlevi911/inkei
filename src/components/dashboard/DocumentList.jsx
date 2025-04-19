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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Processed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Processing
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
      <Card className="border border-slate-200">
        <CardContent className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No documents found</h3>
          <p className="text-slate-600 mb-4">
            Upload documentation files to feed information to the AI manager.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((doc) => (
        <Card key={doc.id} className="border border-slate-200 hover:border-indigo-200 transition-colors">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-slate-900">{doc.name}</h3>
                    <div className="ml-2">
                      {getStatusBadge(doc.status)}
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
                      Uploaded: {formatDate(doc.uploadDate)}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800">
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
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
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