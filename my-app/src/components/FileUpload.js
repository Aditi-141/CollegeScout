import React, { useState } from 'react';
import './FileUploadForm.css';
import FileInput from './FileInput';
import UploadStatus from './UploadStatus';
import ServerResponse from './ServerResponse';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [serverResponse, setServerResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  };

  const toggleShowMore = () => setShowMore(!showMore);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setUploadSuccess(false);
    setIsFileSelected(false);

    if (!selectedFile) {
      alert('Please select a file first!');
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      fetch("http://localhost:8000/api/fileUpload", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      })
      .then((res) => res.json())
      .then((data) => {
        setServerResponse(data.response);
        setIsLoading(false);
        setUploadSuccess(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="container">
      <div className="header">Welcome to College Scout</div>
      <p className="description">
        Upload your Statement of Purpose, and we'll help you find colleges that might be a good fit for you.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <FileInput
          handleFileChange={handleFileChange}
          isFileSelected={isFileSelected}
          selectedFile={selectedFile}
        />
        <button
          type="submit"
          className="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Upload'}
        </button>
      </form>

      <UploadStatus isLoading={isLoading} uploadSuccess={uploadSuccess} />
      <ServerResponse
        serverResponse={serverResponse}
        showMore={showMore}
        toggleShowMore={toggleShowMore}
      />
    </div>
  );
};

export default FileUploadForm;