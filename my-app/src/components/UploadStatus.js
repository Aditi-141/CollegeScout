import './UploadStatus.css';

const UploadStatus = ({ isLoading, uploadSuccess }) => {
    if (isLoading) {
      return <div className="loaderStyle">Analyzing your SOP...</div>;
    }
    if (uploadSuccess) {
      return <div className="loaderStyle">Upload Successful! Analyzing complete.</div>;
    }
    return null;
  };
  
export default UploadStatus;