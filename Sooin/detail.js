const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");
let movies = [];
let baseUrl = new URL(`https://api.themoviedb.org/3/movie`);

const detailRender = async (movieId) => {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
      },
    };
    baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&page=1`;
    const data = await fetch(baseUrl, options).then((response) =>
      response.json()
    );
    console.log(data);
    movies = data;
    const detailHTML = `
          <div class="moiveImg">
            <img
              src="https://image.tmdb.org/t/p/original${movies.backdrop_path}"
              alt=""
            />
            <div class="background"></div>
            <div class="imgBottom">
              <div class="titleWrap">
                <h1>${movies.title}</h1>
                <p>${movies.release_date}</p>
                <p>${movies.vote_average.toFixed(1)}</p>
              </div>
              <div class="deepWrap">
                <div class="deepBtn"><i class="fa-regular fa-heart"></i></div>
                <p>찜하기</p>
              </div>
            </div>
          </div>
          <div class="reviewWrap">
            <div>작품정보</div>
            <div>리뷰</div>
          </div>`;
    detailWrap.innerHTML = detailHTML;
  } catch (error) {
    console.log(error);
  }
};

detailRender(movieId);
