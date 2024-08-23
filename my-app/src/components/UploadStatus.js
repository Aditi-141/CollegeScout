import './UploadStatus.css';

/**
 * UploadStatus component displays the current status of the file upload process.
 * It shows different messages based on whether the file is being uploaded (loading) or has been successfully uploaded.
 * @param {boolean} isLoading - Indicates if the file is currently being uploaded or analyzed.
 * @param {boolean} uploadSuccess - Indicates if the file has been successfully uploaded and processed.
 */
const UploadStatus = ({ isLoading, uploadSuccess }) => {

  // If the file is still being uploaded/processed, show a loading message
  if (isLoading) {
    return <div className="loaderStyle">Analyzing your SOP...</div>;
  }

  // If the file upload is successful, show a success message
  if (uploadSuccess) {
    return <div className="loaderStyle">Upload Successful! Analyzing complete.</div>;
  }

  // If neither loading nor success, return null (nothing is displayed)
  return null;
};

export default UploadStatus;
