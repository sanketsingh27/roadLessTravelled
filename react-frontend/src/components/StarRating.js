import { useState } from "react";

const StartRating = ({ isStatic, inputRating, getRatingValue }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleRating = (rating) => {
    setRating(rating);
    getRatingValue(rating);
  };

  return (
    <>
      <ul className="stcomp">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <>
              {isStatic ? (
                <li key={index} className={index <= inputRating ? `star star-filled` : "star"}></li>
              ) : (
                <li
                  key={index}
                  className={index <= (hover || rating) ? `star star-filled` : "star"}
                  onClick={() => handleRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                ></li>
              )}
            </>
          );
        })}
      </ul>
    </>
  );
};

export default StartRating;
