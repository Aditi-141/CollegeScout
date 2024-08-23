
import './ServerResponse.css';

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
  