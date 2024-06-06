function fetchFact() {
  fetch("http://numbersapi.com/random/trivia")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("fact").innerText = data;
    })
    .catch((error) => {
      console.error("Error fetching the random fact:", error);
      document.getElementById("fact").innerText =
        "Failed to load fact, please try again.";
    });
}

// Fetch a fact on initial load
window.onload = fetchFact;
