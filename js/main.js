const fetchData = (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGQxOGFkNWQ4YjYzYjNmYjY0NjY2NWNmODc4ZGQ0OSIsInN1YiI6IjY1NGIzYjM2Mjg2NmZhMDBmZTAxNzNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D3qxPqwPR55bduPDEpwBBz27tng-T9UsVkFnrF6v6Ag",
    },
  };

  return fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

let imgUrl = "https://image.tmdb.org/t/p/w200";

let todayMovie = document.querySelector(".today-top-10-movie");
let popularMovie = document.querySelector(".popular-movie-view");
let horrorMovie = document.querySelector(".horror-movie-view");
let comedyMovie = document.querySelector(".comedy-movie-view");
let actionMovie = document.querySelector(".action-movie-view"); // 추가: 액션 카테고리를 표시할 요소 선택

let todayMovieData = "";
const todayMovieDataSize = 5;
let todayMoviePageNum = 1;

let todayMovieArr = {
  categoryName: todayMovie,
  data: todayMovieData,
  dataSize: 5,
  pageNum: 0,
};

let popularMovieData = "";
const popularMovieDataSize = 4;
let popularMoviePageNum = 1;

let popularMovieArr = {
  categoryName: popularMovie,
  dataSize: 4,
  pageNum: 0,
};

let horrorMovieData = "";
const horrorMovieDataSize = 6;
let horrorMoviePageNum = 1;

let horrorMovieArr = {
  categoryName: horrorMovie,
  dataSize: 6,
  pageNum: 0,
};
let comedyMovieData = "";
const comedyMovieDataSize = 6;
let comedyMoviePageNum = 1;

let comedyMovieArr = {
  categoryName: comedyMovie,
  data: comedyMovieData,
  dataSize: 6,
  pageNum: 0,
};
let actionMovieData = ""; // 추가: 액션 카테고리 데이터를 저장할 변수
const actionMovieDataSize = 6; // 추가: 액션 카테고리 데이터 크기
let actionMoviePageNum = 1;

const top10URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1";
const popularURL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
const horrorURL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=27&language=ko-KR&page=1";
const comedyURL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=35&language=ko-KR&page=1"; // 코미디 카테고리 URL
const actionURL =
  "https://api.themoviedb.org/3/discover/movie?with_genres=28&language=ko-KR&page=1"; // 추가: 액션 카테고리 URL

const fetchPopularMovies = async () => {
  let movieLateList100 = [];
  let movieLateList100Filter = [];

  for (let i = 1; i < 6; i++) {
    const data = await fetchData(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${i}`
    );
    movieLateList100.push(...data.results);
  }

  // 필터링을 수행하여 바로 콘솔에 출력합니다.
  movieLateList100Filter = movieLateList100.filter(
    (movie) => movie.vote_average >= 6.5
  );
  console.log("무비필터", movieLateList100Filter);
  const popularMovieRender = (data) => {
    todayMovieData = data;
    popularMovieArr.results = data;

    let movieDataList = "";
    const randomNumbers = [];
    while (randomNumbers.length < 20) {
      const randomNumber = Math.floor(Math.random() * 100);
      if (
        !randomNumbers.includes(randomNumber) &&
        randomNumber <= movieLateList100Filter.length
      ) {
        randomNumbers.push(randomNumber);
      }
    }
    randomNumbers.sort((a, b) => a - b);
    console.log("숫자모음", randomNumbers);

    for (let i = 0; i < 4; i++) {
      let targetNum = randomNumbers[i];
      console.log(targetNum);
      console.log(data[targetNum]);
      const imgAddress = data[targetNum].poster_path;
      const rateScore = data[targetNum].vote_average.toFixed(2);
      const titleName = data[targetNum].title;
      const idName = data[targetNum].id;

      movieDataList += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
       
      </section>
    </div>`;
    }

    popularMovie.innerHTML = movieDataList;
    console.log(popularMovie);
  };
  popularMovieRender(movieLateList100Filter);
};

fetchPopularMovies();

// fetchData(popularURL).then((data) => {
//   popularMovieData = data;
//   console.log(data);
//   render(popularMovie, popularMovieData, 4);
// });
fetchData(top10URL).then((data) => {
  todayMovieData = data;

  render(todayMovie, todayMovieData, 5);
});

fetchData(horrorURL).then((data) => {
  horrorMovieData = data;
  horrorMovieArr.results = data;
  render(horrorMovie, horrorMovieData, 6);
});

fetchData(comedyURL).then((data) => {
  comedyMovieData = data;
  render(comedyMovie, comedyMovieData, 6);
});

fetchData(actionURL).then((data) => {
  // 추가: 액션 카테고리 데이터 가져오기
  actionMovieData = data;
  render(actionMovie, actionMovieData, 6); // 추가: 액션 카테고리 데이터 출력
});

const render = (element, data, size, startRenderNum) => {
  let movieDataList = "";
  let categoryName = element;
  if (startRenderNum == undefined) {
    startRenderNum = 1;
  }
  console.log("데이터 시작점", startRenderNum);
  if (categoryName == todayMovie) {
    //top10 무비임
    for (let i = 0; i < size; i++) {
      const imgAddress = data.results[i].poster_path;
      const rateScore = data.results[i].vote_average.toFixed(2);
      const titleName = data.results[i].title;
      const idName = data.results[i].id;

      movieDataList += ` <div class='top-10-side bbbb' onclick="onclickMovieDetail(${idName})">
      <div class="top-10-side-img">${i + 1}</div>
      <img class="bbb bbbb" src="${imgUrl}${imgAddress}" alt="">
      <section class="text-contacts">
          <section class="text-title">${titleName}</section>
          <section class='text-rate'>${rateScore}</section>
          
      </section>
  </div>`;
    }
  } else if (categoryName == popularMovie) {
    //이게 오늘의영화

    for (let i = 0; i < size; i++) {
      const imgAddress = data.results[i].poster_path;
      const rateScore = data.results[i].vote_average.toFixed(2);
      const titleName = data.results[i].title;
      const idName = data.results[i].id;

      movieDataList += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
       
      </section>
    </div>`;
    }
  } else {
    for (let i = 0; i < size; i++) {
      const imgAddress = data.results[i + startRenderNum].poster_path;
      const rateScore =
        data.results[i + startRenderNum].vote_average.toFixed(2);
      const titleName = data.results[i + startRenderNum].title;
      const idName = data.results[i + startRenderNum].id;

      movieDataList += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
      </section>
    </div>`;
    }
  }
  element.innerHTML = movieDataList;
};
let nowPage = 0;
const paginationRender = (category, direction) => {
  console.log("데이터", category);
  if (direction === "right" && category.pageNum < 3) {
    category.pageNum++;
  } else if (direction === "left" && category.pageNum >= 0) {
    category.pageNum--;
  }
  if (category.pageNum < 0) {
    category.pageNum = 2;
  } else if (category.pageNum == 3) {
    category.pageNum = 0;
  }
  console.log("눌렀을때 페이지넘버", category.pageNum);
  let startRenderNum = category.pageNum * category.dataSize;
  render(
    category.categoryName,
    category.results,
    category.dataSize,
    startRenderNum
  );
};

const onclickMovieDetail = (idName) => {
  console.log(idName);
  window.location.href = `detail.html?movieId=${idName}`;
};
