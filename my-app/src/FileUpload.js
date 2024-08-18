import React, { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    fontFamily: "'Roboto', sans-serif", 
    color: '#333',
    minHeight: '100vh',
    padding: '40px 20px',

  },
  header: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: '34px',
    fontWeight: 'bold',
    marginBottom: '10px', 
  },
  description: {
    textAlign: 'center',
    color: '#555', // Slightly lighter than the main text for contrast
    fontSize: '14px',
    margin: '0 0 30px',
    maxWidth: '600px',
    lineHeight: '1.6', // More line height for readability
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    background: '#ffffff',
    padding: '30px',
    borderRadius: '10px', // Rounded corners for a modern look
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // A more pronounced shadow
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #ddd', // A subtle border
  },
  fileInputContainer: {
    position: 'relative',
    backgroundColor: '#f1f1f1',
    borderRadius: '5px',
    padding: '10px 15px',
    width: '100%',
    border: '1px dashed #ccc', // Stylish dashed border for the input
  },
  inputLabel: {
    border: 'none',
    padding: '10px 20px',
    display: 'block',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    color: '#555', // Visible color for the text
  },
  input: {
    opacity: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: '0',
    top: '0',
    cursor: 'pointer',
  },
  button: {
    padding: '15px 30px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#5cb85c', // A fresh, vibrant green for the button
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s, transform 0.1s',
    margin: '10px 0', // Space out the button from the input
  },
  responseContainer: {
    marginTop: '30px',
    background: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #ddd',
    color: '#333', // Ensure text here is also readable
    fontSize: '16px',

  },
  list: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'left',
  },
  listItem: {
    padding: '15px 0',
    borderBottom: '1px solid #eee', // Lighter border for a more refined look
    fontSize: '16px', // Bigger font for readability
  },
  titleItem: {
    padding: '15px 0',
    borderBottom: '1px solid #eee', // Lighter border for a more refined look
    fontSize: '16px', // Bigger font for readability
    backgroundColor: '#f7f7f7', // Light background for contrast
    // color: '#0275d8', // A vibrant color for the header
    fontWeight: 'bold',
    marginBottom: '10px', // Add more space below the header
    width: '100%', // This ensures the background spans the full width of the container


  },
  responseContainer: {
    marginTop: '30px',
    background: '#ffffff',
    padding: '20px',
    borderRadius: '25px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    width: '150%',
    maxWidth: '500px',
    border: '1px solid #ddd',
    color: '#333',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    marginBottom: '10px',
    width: '90%',
    border: '1px solid #eee',
  },
  cardHeader: {
    fontSize: '18px',
    color: '#0275d8',
    fontWeight: 'bold',
  },
  cardBody: {
    fontSize: '16px',
    color: '#555',
  },
  showMoreButton: {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#5cb85c',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold', // This will make the text bold
  },
  messageText: {
    color: '#28a745', // Set the text color to blue
    // Add other styling as needed
  },
};

// Custom styles for file input
const fileInputStyles = {
  input: {
    display: 'none',
  },
  label: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'inline-block',
    cursor: 'pointer',
  },
};

// On button hover
const hoverButtonStyle = {
  backgroundColor: '#4cae4c', // Slightly darker green for hover state
  transform: 'scale(1.05)', // A subtle zoom effect on hover
};

const loaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: '#ffffff',
};


const FileUploadForm = () => {
const [selectedFile, setSelectedFile] = useState(null);
const [isFileSelected, setIsFileSelected] = useState(false); // New state to track file selection
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

    setIsFileSelected(true); // Set the file selected state to true
  } else {
    setIsFileSelected(false);
  }
};

const toggleShowMore = () => {
    setShowMore(!showMore);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true);
  setUploadSuccess(false);
  setIsFileSelected(false); // Set the file selected state to true


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
  <div style={styles.container}>
    <div style={styles.header}>Welcome to College Scout</div>
    <p style={styles.description}>
      Upload your Statement of Purpose, and we'll help you find colleges that might be a good fit for you.
    </p>
    <form onSubmit={handleSubmit} style={styles.form}>
      <label htmlFor="file-upload" style={fileInputStyles.label}>Browse...</label>
      {/* Message to display right after file selection */}
       {isFileSelected && (
          <div style={{ color: '#28a745', marginTop: '10px' }}>
            {selectedFile.name} is ready to be uploaded.
          </div>
        )}
      <input id="file-upload" type="file" onChange={handleFileChange} accept=".txt" style={fileInputStyles.input} />
      <button type="submit" style={hovered ? { ...styles.button, ...hoverButtonStyle } : styles.button} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Upload'}
      </button>
    </form>
     
    <p></p>

    {isLoading && <div style={loaderStyle}>Analyzing your SOP...</div>}
    {!isLoading && uploadSuccess && <div style={loaderStyle}>Upload Successful! Analyzing complete.</div>}
    {serverResponse && (
      <div style={styles.responseContainer}>
        <div style={styles.titleItem}>Student Profile:</div>
        <div>
        <span style={styles.boldText}>Name:</span> <span style={styles.listItem}>{serverResponse.name}</span></div>
        <div><span style={styles.boldText}>Program:</span> {serverResponse.program}</div>
        <p></p>
        <div style={styles.titleItem}>College Recommendations:</div>
        {serverResponse.colleges.length > 0 ? (
          <p style={styles.messageText}>

          <div>{`Based on your interests in ${serverResponse.program}, we have found the following colleges which could be a great fit for you!`}</div></p>
        ) : (
          <div>No recommendations found. Please try uploading another SOP.</div>
        )}
        <ul style={styles.list}>
          {serverResponse.colleges.slice(0, showMore ? serverResponse.colleges.length : 2).map((college, index) => (
            <li key={index} style={styles.card}>
              <div style={styles.cardHeader}>{college.collegeName}</div>
              <p></p>
              <div style={styles.cardBody}>
                <span style={styles.boldText}>Similarity:</span> {college.similarity}
              </div>              
              <p></p>
              <div style={styles.cardBody}>
                <span style={styles.boldText}>Description:</span> {college.description}
              </div>
            </li>
          ))}
        </ul>
        {serverResponse.colleges.length > 2 && (
          <button onClick={toggleShowMore} style={styles.showMoreButton}>
            {showMore ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    )}
  </div>
);
};

export default FileUploadForm;