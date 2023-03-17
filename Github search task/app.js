const form = document.querySelector("form");
const input = document.querySelector("#search");
const results = document.querySelector("#results");

form.addEventListener("submit", event => {
  event.preventDefault();
  results.innerHTML = ""; // clear previous results

  const query = input.value;
  if (query.length < 3) {
    alert("Please enter at least 3 characters");
    return;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.total_count === 0) {
        results.textContent = "Nothing found";
      } else {
        const items = data.items.slice(0, 10); // only show first 10 results
        items.forEach(item => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = item.html_url;
          a.target = "_blank";
          a.textContent = item.full_name;
          li.appendChild(a);
          const p = document.createElement("p");
          p.textContent = item.description;
          li.appendChild(p);
          results.appendChild(li);
        });
      }
    })
    .catch(error => {
      console.error(error);
      results.textContent = "An error occurred, please try again later";
    });
});
