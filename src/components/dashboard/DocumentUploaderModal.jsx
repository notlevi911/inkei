import React, { useState, useRef } from 'react';
import Button from '../ui/button';
import { Card } from '../ui/card';

const DocumentUploaderModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [previewContent, setPreviewContent] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length > 0) {
      // Filter only markdown files
      const markdownFiles = selectedFiles.filter(file => 
        file.type === 'text/markdown' || file.name.endsWith('.md')
      );
      
      setFiles(prevFiles => [...prevFiles, ...markdownFiles]);
      
      // Read the first file for preview
      if (markdownFiles.length > 0 && !previewFile) {
        previewMarkdownFile(markdownFiles[0]);
      }
    }
  };

  const previewMarkdownFile = (file) => {
    setPreviewFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    setFiles(newFiles);
    
    // If the removed file was being previewed, clear the preview
    if (previewFile && previewFile.name === removedFile.name) {
      setPreviewFile(null);
      setPreviewContent('');
      
      // Set new preview if other files exist
      if (newFiles.length > 0) {
        previewMarkdownFile(newFiles[0]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const markdownFiles = droppedFiles.filter(file => 
        file.type === 'text/markdown' || file.name.endsWith('.md')
      );
      
      setFiles(prevFiles => [...prevFiles, ...markdownFiles]);
      
      // Read the first file for preview if no preview exists
      if (markdownFiles.length > 0 && !previewFile) {
        previewMarkdownFile(markdownFiles[0]);
      }
    }
  };

  const handleSubmit = () => {
    if (files.length === 0) return;
    
    // Process files
    console.log('Uploading files:', files);
    
    // Close modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Upload Documentation</h2>
          <p className="text-slate-600 mb-6">
            Upload Markdown (.md) files to be processed by the AI manager.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-slate-600 text-center mb-2">
                  Drag and drop your Markdown files here, or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  Supported format: Markdown (.md)
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".md,text/markdown" 
                  multiple 
                  onChange={handleFileChange} 
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-slate-800 mb-2">Selected Files</h3>
                <div className="max-h-60 overflow-y-auto">
                  {files.length === 0 ? (
                    <p className="text-sm text-slate-500">No files selected</p>
                  ) : (
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-slate-100 p-2 rounded-md">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm truncate max-w-xs">{file.name}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              type="button" 
                              className="text-indigo-600 hover:text-indigo-800"
                              onClick={() => previewMarkdownFile(file)}
                              title="Preview"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button 
                              type="button" 
                              className="text-red-600 hover:text-red-800"
                              onClick={() => removeFile(index)}
                              title="Remove"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <Card className="h-full">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-medium text-slate-800">
                    {previewFile ? `Preview: ${previewFile.name}` : 'Markdown Preview'}
                  </h3>
                </div>
                <div className="p-4 max-h-80 overflow-y-auto">
                  {previewContent ? (
                    <div className="prose prose-slate max-w-none">
                      <pre className="whitespace-pre-wrap text-sm">{previewContent}</pre>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-slate-400">
                      <p>Select a file to preview its content</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={files.length === 0}
            >
              Upload Files
            </Button>
          </div>
        </div>
        
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
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

export default DocumentUploaderModal;