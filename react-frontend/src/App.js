import "./App.css";
import TopSection from "./components/TopSection";
import ReviewList from "./components/ReviewList";
import { useEffect, useState } from "react";

function App() {
  const [aveRating, setAveRating] = useState(0);
  const [reviews, setReviews] = useState(0);

  const fetchReviews = () => {
    fetch("http://localhost:5500/reviews")
      .then((response) => response.json())
      .then((result) => {
        const { averageRating, reviews } = result;
        setAveRating(averageRating);
        setReviews(reviews);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <>
      <div className="container">
        <h1>The Minimalist Entrepreneur.</h1>
        <TopSection reviews={reviews} setReviews={setReviews} averageRating={aveRating} />
        <br />
        <br />
        <hr />
        {reviews.length > 0 && <ReviewList reviews={reviews} />}
      </div>
    </>
  );
}

export default App;
