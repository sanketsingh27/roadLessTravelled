const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    max: 5,
    required: true,
  },
});

reviewSchema.statics.getReviews = async () => {
  const reviews = await Review.find({});

  let aggregate = 0;

  reviews.forEach((review) => (aggregate += review.rating));

  const averageRating = Math.round((aggregate / reviews.length) * 10) / 10;

  return {
    averageRating,
    reviews,
  };
};

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
