const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
  },
};
let imgUrl = "https://image.tmdb.org/t/p/w200";
let todayMovie = document.getElementById("aaa");
let todayMovieDataList = "";
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1",
  options
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.results[0].poster_path);
    todayMovieDataList = `<img class="bbb" src="${imgUrl}${data.results[0].poster_path}" alt="">`;
    todayMovie.innerHTML = todayMovieDataList;
  })

  .catch((err) => console.error(err));
