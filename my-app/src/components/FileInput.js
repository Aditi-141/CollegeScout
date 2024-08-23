import './FileInput.css';

/**
 * FileInput component that handles the file selection input for uploading.
 * @param {function} handleFileChange - Function to handle the file selection event.
 * @param {boolean} isFileSelected - Boolean value indicating whether a file has been selected or not.
 * @param {object} selectedFile - The file object that has been selected.
 */
const FileInput = ({ handleFileChange, isFileSelected, selectedFile }) => (
  <>
    {/* Label for the file input field, styled as a "Browse" button */}
    <label htmlFor="file-upload" className="inputLabel">Browse...</label>
    
    {/* If a file is selected, display the file name with a message */}
    {isFileSelected && (
      <div className="messageText">
        {selectedFile.name} is ready to be uploaded.
      </div>
    )}
    
    {/* File input field to handle file selection */}
    <input
      id="file-upload"
      type="file"
      onChange={handleFileChange}
      accept=".txt"
    />
  </>
);

export default FileInput;
