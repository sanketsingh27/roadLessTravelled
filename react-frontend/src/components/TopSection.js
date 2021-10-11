import { useState } from "react";
import StartRating from "./StarRating";
import AddReview from "./AddReview";
const TopSection = ({ averageRating }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div id="reviews-section">
      <div id="aggrigate-raiting">
        <span className="ratingText" id="aggrigate-rating-text">
          {averageRating}
        </span>
        <div id="aggrigate-rating-star">
          <StartRating isStatic={true} inputRating={averageRating} />
        </div>
      </div>

      <button type="button" onClick={() => setOpenModal(true)} className="btn" id="addReviewBtn">
        Add Review
      </button>
      {openModal && <AddReview closeModal={setOpenModal} />}
    </div>
  );
};

export default TopSection;
