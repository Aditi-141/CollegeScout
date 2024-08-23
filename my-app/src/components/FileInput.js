import './FileInput.css';

const FileInput = ({ handleFileChange, isFileSelected, selectedFile }) => (
    <>
      <label htmlFor="file-upload" className="inputLabel">Browse...</label>
      {isFileSelected && (
        <div className="messageText">
          {selectedFile.name} is ready to be uploaded.
        </div>
      )}
      <input id="file-upload" type="file" onChange={handleFileChange} accept=".txt" />
    </>
  );
  
  export default FileInput;
  