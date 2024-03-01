let searchedMoviesList = [];
const API_KEY = "e8d18ad5d8b63b3fb646665cf878dd49";
let userInput = document.querySelector(".task-input");

const getMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
    },
  };

  userInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      getMoviesByKeyword(event);
    }
  });

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
    options
  );
  const data = await response.json();
  console.log("rrrrr", data.results);
  searchedMoviesList = data.results;
  render();
};

getMovieData();

const getMoviesByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${keyword}&api_key=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("keyword data", data);
  searchedMoviesList = data.results;
  render();
};

const render = () => {
  let imgUrl = "https://image.tmdb.org/t/p/w200";
  const movieHTML = searchedMoviesList.map(
    (movies) => `<div class="row">
  <div class="col-lg-1">
    <img
      class="img-size"
      src="${imgUrl}${movies.poster_path}" alt=""
    />
  </div>
<div class="col-lg-10">
  <h4>${movies.title}</h4>
  <p>${movies.overview}</p>
</div>
<div class="col-lg-1">
</div>
</div>`
  );

  document.getElementById("searched-list").innerHTML = movieHTML.join("");
};
