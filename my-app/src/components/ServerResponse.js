
import './ServerResponse.css';


/**
 * ServerResponse component that displays the server's response to the file upload.
 * It shows the student's profile, college recommendations, and a "Show More" toggle if needed.
 * 
 * @param {object} serverResponse - The response from the server containing student profile and college recommendations.
 * @param {boolean} showMore - Boolean value to indicate if the user has clicked the "Show More" button to see all colleges.
 * @param {function} toggleShowMore - Function to toggle between showing more or fewer college recommendations.
 * 
 */
const ServerResponse = ({ serverResponse, showMore, toggleShowMore }) => (
    <>
      {serverResponse && (
        <div className="responseContainer">
          <div className="titleItem">Student Profile:</div>
          <div>
            <span className="boldText">Name:</span> {serverResponse.name}
          </div>
          <div>
            <span className="boldText">Program:</span> {serverResponse.program}
          </div>
          <div className="titleItem">College Recommendations:</div>
          {/* Conditional rendering: If colleges are found, display a message; otherwise, show a fallback message */}
          {serverResponse.colleges.length > 0 ? (
            <div className="messageText">
              Based on your interests in {serverResponse.program}, we have found the following colleges which could be a great fit for you!
            </div>
          ) : (
            <div>No recommendations found. Please try uploading another SOP.</div>
          )}
          <ul className="list">
            {serverResponse.colleges.slice(0, showMore ? serverResponse.colleges.length : 2).map((college, index) => (
              <li key={index} className="card">
                <div className="cardHeader">{college.collegeName}</div>
                <p></p>
                <div className="cardBody">
                <div><span className="boldText">Similarity:</span> {college.similarity}</div>
                <div><span className="boldText">Description:</span> {college.description}</div>
                </div>
              </li>
            ))}
          </ul>
          {/* Show the "Show More" button only if there are more than 2 colleges */}
          {serverResponse.colleges.length > 2 && (
            <button onClick={toggleShowMore} className="showMoreButton">
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      )}
    </>
  );
  
export default ServerResponse;
  