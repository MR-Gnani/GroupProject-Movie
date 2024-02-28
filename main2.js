let searchedMoviesList = [];

const getMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  const data = await response.json();
  console.log("rrrrr", data.results);
  searchedMoviesList = data.results;
  render();
};

getMovieData();

const render = () => {
  const movieHTML = searchedMoviesList.map(
    (movies) => `<div class="row">
  <div class="col-lg-4">
    <img
      class="img-size"
      src="${movies.poster_path}"
    />
  </div>
</div>
<div class="col-lg-8">
  <h2>${movies.original_title}</h2>
  <p>${movies.overview}</p>
  <div>${movies.release_date}</div>
</div>`
  );

  document.getElementById("searched-list").innerHTML = movieHTML;
};
