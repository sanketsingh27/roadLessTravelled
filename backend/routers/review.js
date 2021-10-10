const express = require("express");
const Review = require("../models/review");
const router = new express.Router();

router.post("/reviews", async (req, res) => {
  console.log(req.body);
  const review = new Review({
    ...req.body,
  });

  try {
    await review.save();
    res.status(201).send(review);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.getReviews();
    res.send(reviews);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
