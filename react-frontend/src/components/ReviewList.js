import StarRating from "./StarRating";

const ReviewList = ({ reviews }) => {
  return (
    <>
      <div id="reviews">
        <h1>Review</h1>
        <div id="review-list">
          {reviews.map(({ rating, review, _id }) => (
            <li key={_id} className="review">
              <StarRating isStatic={true} inputRating={rating} />
              <span>{rating}</span>
              <span>{`, ${review}`}</span>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
