import React, { useState } from 'react';
import './FileUploadForm.css'; 
import FileInput from './FileInput'; 
import UploadStatus from './UploadStatus'; 
import ServerResponse from './ServerResponse'; 

const FileUploadForm = () => {
  // States for managing the file upload process
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false); 
  const [uploadSuccess, setUploadSuccess] = useState(false); 
  const [serverResponse, setServerResponse] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const [hovered, setHovered] = useState(false); 
  const [showMore, setShowMore] = useState(false); 

  /**
   * Handles the change event when a user selects a file.
   * @param {object} event - The event triggered when a file is selected.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file); 
      setUploadSuccess(false);
      setIsFileSelected(true); 
    } else {
      setIsFileSelected(false); // No file selected
    }
  };

  // Toggles the "Show More" button for server response
  const toggleShowMore = () => setShowMore(!showMore);

 /**
   * Handles form submission and file upload. 
   * Reads the file content and sends it to the backend server for processing.
   * @param {object} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setIsLoading(true); 
    setUploadSuccess(false);
    setIsFileSelected(false);

    // If no file is selected, show an alert and stop the submission process
    if (!selectedFile) {
      alert('Please select a file first!');
      setIsLoading(false); // Reset loading state
      return;
    }

    // Create a FileReader object to read the contents of the selected file
    const reader = new FileReader();
    
    // Once the file is read, send its contents to the server
    reader.onload = async (e) => {
      const text = e.target.result; // Get the file content (SOP)
      
      // Send the file content to the backend server for processing
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

      {/* Form for file upload */}
      <form onSubmit={handleSubmit} className="form">
        <FileInput
          handleFileChange={handleFileChange}
          isFileSelected={isFileSelected} 
          selectedFile={selectedFile}
        />
        
        {/* Submit button for uploading the file */}
        <button
          type="submit"
          className="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Upload'} {/* Show loading text when processing */}
        </button>
      </form>

      {/* Display the upload status (loading, success, etc.) */}
      <UploadStatus isLoading={isLoading} uploadSuccess={uploadSuccess} />

      {/* Display the server's response after analysis */}
      <ServerResponse
        serverResponse={serverResponse}
        showMore={showMore}
        toggleShowMore={toggleShowMore}
      />
    </div>
  );
};

export default FileUploadForm;