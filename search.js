let searchedMoviesList = [];
const startPage = 1;
const endPage = 5;

const getMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
    },
  };
  for (let i = startPage; i <= endPage; i++) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=${i}`,
      options
    );
    const data = await response.json();
    console.log("rrrrr", data.results);
    searchedMoviesList = searchedMoviesList.concat(data.results);
    render();
  }
};

getMovieData();

const getMoviesByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  const url = new URL(
    `https://api.themoviedb.org/3/search/movie?language=ko-KR&query=${keyword}&api_key=e8d18ad5d8b63b3fb646665cf878dd49`
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
  <div class="col-lg-4">
    <img
      class="img-size"
      src="${imgUrl}${movies.poster_path}" alt=""
    />
  </div>
<div class="col-lg-8">
  <h2>${movies.title}</h2>
  <p>${movies.overview}</p>
  <div>${movies.release_date}</div>
</div>
</div>`
  );

  document.getElementById("searched-list").innerHTML = movieHTML.join("");
};
