import { useRef, useState, useEffect } from "react";
import StatRating from "./StarRating";
const AddReview = ({ reviews, setReviews, openModal }) => {
  const reviewRef = useRef(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // clean up
    return () => {
      reviewRef.current = null;
      setRating(null);
    };
  }, []);

  const postNewReview = () => {
    if (reviewRef.current === null || rating === null) {
      alert("Review and Rating field cannot be empty.");
      return;
    }

    const data = {
      review: reviewRef.current,
      rating: Number(rating),
    };

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://localhost:5500/reviews", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setReviews([...reviews, result]);
        alert("Added New Review");
        openModal(false);
      })
      .catch((error) => {
        alert("Error occurred while adding new review.");
        openModal(false);
        console.log("error", error);
      });
  };

  return (
    <div id="addReviewModal" className="modal">
      <div className="modal-content">
        <span onClick={() => openModal(false)} className="close">
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
        <button onClick={postNewReview} id="submitNewReview" className="btn">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
