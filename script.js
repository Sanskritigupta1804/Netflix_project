
      const API_KEY = "1404e40c";
      const BASE_URL = "http://www.omdbapi.com/?apikey=" + API_KEY;

      async function fetchMovies(search, containerId) {
        const res = await fetch(`${BASE_URL}&s=${search}`);
        const data = await res.json();

        if (data.Search) {
          const container = document.getElementById(containerId);
          container.innerHTML = data.Search.map(
            (movie) => `
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}">
        `
          ).join("");
        }
      }

      async function loadHero() {
        const res = await fetch(`${BASE_URL}&t=Inception`);
        const data = await res.json();
        document.getElementById("hero").style.backgroundImage =
          `url(${data.Poster})`;
        document.getElementById("hero-title").textContent = data.Title;
        document.getElementById("hero-desc").textContent = data.Plot;
      }

      loadHero();
      fetchMovies("batman", "trending");
      fetchMovies("action", "action");
      fetchMovies("comedy", "comedy");

      document.getElementById("searchBox")
        .addEventListener("keypress", async function (e) {
          if (e.key === "Enter") {
            const query = e.target.value;
            if (query.trim() !== "") {
              fetchMovies(query, "trending");
            }
          }
        });
    