document
  .getElementById("getDadJokeBtn")
  .addEventListener("click", fetchDadJoke);

async function fetchDadJoke() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  try {
    const response = await fetch("https://icanhazdadjoke.com/", options);
    const data = await response.json();
    document.getElementById("joke").innerText = data.joke;
  } catch (error) {
    console.error("Error fetching the dad joke:", error);
    document.getElementById("joke").innerText = "Failed to fetch a dad joke.";
  }
}
