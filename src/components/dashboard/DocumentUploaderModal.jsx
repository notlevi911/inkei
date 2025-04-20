import React, { useState, useRef } from 'react';
import Button from '../ui/button';
import { Card } from '../ui/card';

const DocumentUploaderModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [previewContent, setPreviewContent] = useState('');
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
      
      // Read the first file for preview if no preview exists
      if (selectedFiles.length > 0 && !previewFile) {
        handlePreviewFile(selectedFiles[0]);
      }
    }
  };

  const handlePreviewFile = (file) => {
    setPreviewFile(file);
    
    // Determine file type for preview
    if (file.type.startsWith('image/')) {
      setPreviewType('image');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'application/pdf') {
      setPreviewType('pdf');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
      setPreviewType('markdown');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target.result);
      };
      reader.readAsText(file);
    } else if (file.type.startsWith('text/') || 
               file.type === 'application/json' || 
               file.name.endsWith('.json') || 
               file.name.endsWith('.js') || 
               file.name.endsWith('.ts') || 
               file.name.endsWith('.html') || 
               file.name.endsWith('.css')) {
      setPreviewType('text');
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewContent(e.target.result);
      };
      reader.readAsText(file);
    } else {
      setPreviewType('unsupported');
      setPreviewContent(`No preview available for ${file.type || 'this file type'}`);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const removedFile = newFiles.splice(index, 1)[0];
    setFiles(newFiles);
    
    // If the removed file was being previewed, clear the preview
    if (previewFile && previewFile.name === removedFile.name) {
      setPreviewFile(null);
      setPreviewContent('');
      setPreviewType(null);
      
      // Set new preview if other files exist
      if (newFiles.length > 0) {
        handlePreviewFile(newFiles[0]);
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
      
      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
      
      // Read the first file for preview if no preview exists
      if (droppedFiles.length > 0 && !previewFile) {
        handlePreviewFile(droppedFiles[0]);
      }
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    } else if (file.type === 'application/pdf') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    } else if (file.type.includes('audio')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      );
    } else if (file.type.includes('video')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    if (files.length === 0) return;
    
    // Process files
    console.log('Uploading files:', files);
    
    // Close modal
    onClose();
  };

  const renderPreview = () => {
    if (!previewContent) {
      return (
        <div className="flex items-center justify-center h-64 text-slate-500">
          <p>Select a file to preview its content</p>
        </div>
      );
    }

    switch (previewType) {
      case 'image':
        return (
          <div className="flex items-center justify-center">
            <img src={previewContent} alt="Preview" className="max-w-full max-h-80 object-contain" />
          </div>
        );
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400">PDF Preview Not Available</p>
            <a 
              href={previewContent} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-2 text-indigo-400 hover:text-indigo-300 text-sm"
            >
              Open PDF in new tab
            </a>
          </div>
        );
      case 'markdown':
      case 'text':
        return (
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-slate-300 overflow-auto max-h-80">{previewContent}</pre>
          </div>
        );
      case 'unsupported':
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <p>{previewContent}</p>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 text-slate-500">
            <p>Unable to preview this file type</p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative bg-slate-900 border border-slate-700/60 rounded-xl shadow-2xl w-full max-w-5xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Upload Media</h2>
          <p className="text-slate-300 mb-6">
            Upload any type of media files to be processed by the AI manager.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div 
                className="border-2 border-dashed border-slate-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-800/70 hover:bg-slate-800 transition-colors"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-slate-300 text-center mb-2">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="text-xs text-slate-400">
                  Supports all media types: Images, Documents, etc.
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  multiple 
                  onChange={handleFileChange} 
                />
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium text-slate-300 mb-2">Selected Files</h3>
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {files.length === 0 ? (
                    <p className="text-sm text-slate-500">No files selected</p>
                  ) : (
                    <ul className="space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-slate-800/70 p-2 rounded-md">
                          <div className="flex items-center">
                            {getFileIcon(file)}
                            <div className="ml-2 flex flex-col">
                              <span className="text-sm truncate max-w-xs text-slate-300">{file.name}</span>
                              <span className="text-xs text-slate-500">{formatFileSize(file.size)}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              type="button" 
                              className="text-indigo-400 hover:text-indigo-300"
                              onClick={() => handlePreviewFile(file)}
                              title="Preview"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button 
                              type="button" 
                              className="text-red-400 hover:text-red-300"
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
              <Card className="h-full bg-slate-800 border border-slate-700">
                <div className="p-4 border-b border-slate-700">
                  <h3 className="font-medium text-slate-300">
                    {previewFile ? `Preview: ${previewFile.name}` : 'File Preview'}
                  </h3>
                </div>
                <div className="p-4">
                  {renderPreview()}
                </div>
              </Card>
            </div>
          </div>
          
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
              type="button"
              variant="primary"
              onClick={handleSubmit}
              disabled={files.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white disabled:bg-slate-700 disabled:text-slate-500"
            >
              Upload Files
            </Button>
          </div>
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
export default DocumentUploaderModal;