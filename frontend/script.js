const noOfStars = 5;
let allReviews = [];
const modal = document.getElementById("addReviewModal");

const addReviewBtn = document.getElementById("addReviewBtn");

const closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
addReviewBtn.onclick = function () {
  console.log("open model");
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// star component
const makeStaticRatingComponent = (rating) => {
  console.log({ rating });
  let starComponent = document.createElement("ul");
  starComponent.className = "stcomp";
  for (let i = 0; i < noOfStars; i++) {
    const li = document.createElement("li");
    li.setAttribute("data-rating", i + 1);
    li.className = "star";
    if (i === 0) li.tabIndex = 0;
    starComponent.append(li);
  }

  rating > 5 ? (rating = 5) : null;

  for (let index = 0; index < rating; index++) {
    console.log(starComponent.children[index]);
    starComponent.children[index].classList.add("star-filled");
  }
  return starComponent;
};

const renderAggregateRating = (rating) => {
  //aggregate rating
  document.getElementById("aggrigate-rating-text").innerText = rating;

  //render aggregate start component
  document.getElementById("aggrigate-rating-star").appendChild(makeStaticRatingComponent(rating));
};

const renderReviews = () => {
  let list = document.createElement("ul");

  for (let i = 0; i < allReviews.length; i++) {
    const { rating, review } = allReviews[i];
    const review_item = document.createElement("li");
    review_item.className = "review";

    review_item.append(makeStaticRatingComponent(rating));

    const rating_text = document.createElement("span");
    rating_text.innerText = rating;

    const comment = document.createElement("span");
    comment.innerText = ", " + review;

    review_item.append(rating_text);
    review_item.append(comment);

    list.append(review_item);
  }
  document.getElementById("review-list").append(list);
};

const getReviews = () => {
  console.log("get reviews was called ");
  fetch("http://localhost:5500/reviews")
    .then((response) => response.json())
    .then((result) => {
      const { averageRating, reviews } = result;
      allReviews = [...allReviews, ...reviews];
      renderAggregateRating(averageRating);
      renderReviews();
    })
    .catch((error) => console.log("error", error));
};

const makeStarRatingComponent = function (rating = 0) {
  let starComponent;

  function changeRating(newRating) {
    rating = newRating;
  }

  function getStarComponent() {
    if (!starComponent) {
      starComponent = document.createElement("ul");
      starComponent.className = "stcomp";
      for (let i = 0; i < noOfStars; i++) {
        const li = document.createElement("li");
        li.setAttribute("data-rating", i + 1);
        li.className = "star";
        if (i === 0) li.tabIndex = 0;
        starComponent.append(li);
      }
      starComponent.addEventListener("mouseover", onMouseOver);
      starComponent.addEventListener("mouseleave", onMouseLeave);
      starComponent.addEventListener("click", onMouseClick);
    }
    return starComponent;
  }

  function renderChanges(rating) {
    for (let index = 0; index < rating; index++) {
      starComponent.children[index].classList.add("star-filled");
    }
    for (let index = rating; index < noOfStars; index++) {
      starComponent.children[index].classList.remove("star-filled");
    }
  }

  function onMouseOver(e) {
    let isStar = e.target.classList.contains("star");
    if (isStar) {
      const { rating } = e.target.dataset;
      renderChanges(rating);
    }
  }

  function onMouseLeave(e) {
    renderChanges(rating);
  }

  function onMouseClick(e) {
    let star = e.target ?? e;
    console.log({ star: e.target });
    let isStar = star.classList.contains("star");
    if (isStar) {
      activate(star);
      let { rating } = star.dataset;
      if (e.key !== "Tab" && rating === getRating()) {
        rating = 0;
        resetTabIndex();
        starComponent.firstElementChild.tabIndex = 0;
      }
      changeRating(rating);
      renderChanges(rating);
    }
  }

  function activate(element) {
    resetTabIndex();
    element.tabIndex = 0;
    element.focus();
  }

  function resetTabIndex() {
    starComponent.childNodes.forEach((star) => {
      star.tabIndex = -1;
    });
  }
  function getRating() {
    return rating;
  }

  return { getRating, getStarComponent };
};

const starRatingComponent = makeStarRatingComponent();
document.getElementById("review-stars").append(starRatingComponent.getStarComponent());

// SUBMIT NEW REVIEW
document.getElementById("submitNewReview").addEventListener("click", () => {
  const rating = starRatingComponent.getRating();
  const reviewText = document.getElementById("review-text");
  const review = reviewText.value;

  const data = {
    review: review,
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
      allReviews = [...allReviews, result];
      console.log(allReviews.length);
      modal.style.display = "none";
      document.getElementById("review-list").innerHTML = "";
      renderReviews();
    })
    .catch((error) => console.log("error", error));
});
