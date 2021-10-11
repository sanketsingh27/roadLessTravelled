import { useRef, useState } from "react";
import StatRating from "./StarRating";
const AddReview = ({ closeModal }) => {
    const postNewReview = () => {
        
    };

  const reviewRef = useRef("");
  const [rating, setRating] = useState(null);
  console.log("RATING", rating);

  return (
    <div id="addReviewModal" className="modal">
      <div className="modal-content">
        <span onClick={() => closeModal(false)} className="close">
          &times;
        </span>
        <h1>What’s your rating?</h1>
        <p>Rating</p>
        <span id="review-stars">
          <StatRating getRatingValue={setRating} />
        </span>
        <p>Review</p>
        <input
          id="review-text"
          ref={reviewRef}
          type="text"
          onChange={(e) => (reviewRef.current = e.target.value)}
          placeholder="Start typing...."
        />
        <br />
        <button  onClick={postNewReview} id="submitNewReview" className="btn">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
