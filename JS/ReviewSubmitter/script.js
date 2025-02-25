let reviewContainer = document.getElementById("submittedcontainer");
let username = document.getElementById("username");
let userreview = document.getElementById("userreview");
let btn = document.getElementById("submitreview");

btn.addEventListener("click", () => {
  let review = document.createElement("div");
  review.classList.add("submitted-item");

  let author = document.createElement("div");
  author.classList.add("review-author");
  author.textContent = username.value;

  let text = document.createElement("div");
  text.classList.add("review-text");
  text.textContent = `"${userreview.value}"`;

  review.appendChild(author);
  review.appendChild(text);
  reviewContainer.appendChild(review);

  username.value = "";
  userreview.value = "";
});
