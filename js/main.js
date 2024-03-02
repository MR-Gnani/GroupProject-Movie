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
let latestMovie = document.querySelector(".latest-movie-view");
let scrollEnd = document.querySelector(".scroll-end");

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

let changeMovieArr = {
  categoryName: "",
  changeTitle: "",
  dataSize: 6,
  pageNum: 0,
};

let latestMovieArr = {
  categoryName: latestMovie,
  changeTitle: "",
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
const latestURL =
  "https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1";

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

    for (let i = 0; i < 4; i++) {
      let targetNum = randomNumbers[i];

      const imgAddress = data[targetNum].poster_path;
      const rateScore = data[targetNum].vote_average.toFixed(2);
      const titleName = data[targetNum].title;
      const idName = data[targetNum].id;
      const contactsCategory = data[targetNum].genre_ids;

      getKeyByCategoryCodes(movieCategoryCodes, contactsCategory);
      let matchedKeys = getKeyByCategoryCodes(
        movieCategoryCodes,
        contactsCategory
      );

      movieDataList += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
      <section class='contains-category'>${matchedKeys}</section>
      </section>
    </div>`;
    }

    popularMovie.innerHTML = movieDataList;
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
  todayMovieArr.results = data;

  render(todayMovie, todayMovieData, 5, 0);
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

// fetchData(actionURL).then((data) => {
//   // 추가: 액션 카테고리 데이터 가져오기
//   actionMovieData = data;
//   render(actionMovie, actionMovieData, 6); // 추가: 액션 카테고리 데이터 출력
// });

fetchData(latestURL).then((data) => {
  latestMovieArr.data = data;
  latestMovieArr.results = data;
  render(latestMovieArr.categoryName, latestMovieArr.data, 6);
});

const render = (element, data, size, startRenderNum) => {
  let movieDataList = "";
  let categoryName = element;

  if (startRenderNum == undefined) {
    startRenderNum = 1;
  }

  if (categoryName == todayMovie) {
    //top10 무비임
    for (let i = 0; i < 5; i++) {
      const imgAddress = data.results[i + startRenderNum].poster_path;
      const rateScore =
        data.results[i + startRenderNum].vote_average.toFixed(2);
      const titleName = data.results[i + startRenderNum].title;
      const idName = data.results[i + startRenderNum].id;
      const contactsCategory = data.results[i + startRenderNum].genre_ids;

      getKeyByCategoryCodes(movieCategoryCodes, contactsCategory);
      let matchedKeys = getKeyByCategoryCodes(
        movieCategoryCodes,
        contactsCategory
      );

      movieDataList += ` <div class='top-10-side bbbb' onclick="onclickMovieDetail(${idName})">
      <div class="top-10-side-img">${i + startRenderNum + 1}</div>
      <img class="bbb bbbb" src="${imgUrl}${imgAddress}" alt="">
      <section class="text-contacts">
          <section class="text-title">${titleName}</section>
          <section class='text-rate'>${rateScore}</section>
          <section class='contains-category'>${matchedKeys}</section>
          
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

      movieDataList += ` <div class="popular-movie horrorMovieArr" onclick="onclickMovieDetail(${idName})">
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
      const contactsCategory = data.results[i + startRenderNum].genre_ids;

      getKeyByCategoryCodes(movieCategoryCodes, contactsCategory);
      let matchedKeys = getKeyByCategoryCodes(
        movieCategoryCodes,
        contactsCategory
      );

      movieDataList += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
      <section class='contains-category'>${matchedKeys}</section>
      </section>
    </div>`;
    }
  }
  categoryName.innerHTML = movieDataList;
};
let nowPage = 0;

const movieCategoryCodes = {
  액션: 28,
  모험: 12,
  애니메이션: 16,
  코미디: 35,
  범죄: 80,
  드라마: 18,
  가족: 10751,
  판타지: 14,
  공상과학: 878,
  공포: 27,
  음악: 10402,
  미스터리: 9648,
  로맨스: 10749,
  스릴러: 53,
  전쟁: 10752,
  서부: 37,
};

const paginationRender = (category, direction) => {
  console.log("페이지정보", category);
  console.log("페이지넘버", category.pageNum);
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
  if (category.categoryName == todayMovie && category.pageNum >= 2) {
    category.pageNum = 0;
  }

  let startRenderNum = category.pageNum * category.dataSize;
  console.log("스타트넘버", startRenderNum);
  render(
    category.categoryName,
    category.results,
    category.dataSize,
    startRenderNum
  );
};

const onclickMovieDetail = (idName) => {
  window.location.href = `detail.html?movieId=${idName}`;
};

let categoryCodeArrNum = 0;

const categoryChangeRender = (titleClass, titleView) => {
  let changeTitle = document.querySelector(`.${titleClass}`);
  let changeView = document.querySelector(`.${titleView}`);
  changeMovieArr.categoryName = changeView;
  console.log("카테고리 객체넘버", categoryCodeArrNum);
  categoryCodeArrNum++;
  console.log(Object.keys(movieCategoryCodes).length);
  if (categoryCodeArrNum == Object.keys(movieCategoryCodes).length) {
    categoryCodeArrNum = 0;
  }

  let categoryCodeURL = `https://api.themoviedb.org/3/discover/movie?with_genres=${
    Object.values(movieCategoryCodes)[categoryCodeArrNum]
  }&language=ko-KR&page=1`;

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
  fetchData(categoryCodeURL).then((data) => {
    categoryChangeData = data;
    changeMovieArr.results = data;

    render(changeView, categoryChangeData, 6);

    const categoryTitleChangeRender = () => {
      changeCodeNam = Object.keys(movieCategoryCodes)[categoryCodeArrNum];
      let changeTitle = document.querySelector(".category-change-title");
      console.log(changeTitle);
      changeTitle.textContent = `# ${changeCodeNam}`;

      // changeTitle.innerHTML = `<div class=" category-change" onclick="categoryChangeRender('category-change')">
      // <div class="category-change-title" style="font-size: 1em"># ${
      //   Object.keys(movieCategoryCodes)[categoryCodeArrNum]
      // }</div>
      // <div><svg class="category-change-arrow" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" fill="currentColor" class="bi bi-caret-right" viewBox="0 0 16 16">
      //   <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
      // </svg></div>`;
    };
    categoryTitleChangeRender();
    // categoryChangeRender();
  });
};

let scrollEndArr = {
  categoryName: scrollEnd,
  dataSize: 6,
  pageNum: 0,
};
let scrollEndURL =
  "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";

window.addEventListener("scroll", function () {
  let scrollPosition =
    window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

  let documentHeight = document.body.scrollHeight;

  let windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  if (scrollPosition + windowHeight >= documentHeight) {
    fetchData(scrollEndURL).then((data) => {
      scrollEndArr.results = data;
      scrollEndArr.pageNum++;
      scrollEndURL = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${
        1 + scrollEndArr.pageNum
      }`;
    });

    let HTMLdata = "";
    for (let i = 0; i < 18; i++) {
      const imgAddress = scrollEndArr.results.results[i].poster_path;
      const rateScore = scrollEndArr.results.results[i].vote_average.toFixed(2);
      const titleName = scrollEndArr.results.results[i].title;
      const idName = scrollEndArr.results.results[i].id;
      const contactsCategory = scrollEndArr.results.results[i].genre_ids;

      getKeyByCategoryCodes(movieCategoryCodes, contactsCategory);
      let matchedKeys = getKeyByCategoryCodes(
        movieCategoryCodes,
        contactsCategory
      );

      HTMLdata += ` <div class="popular-movie" onclick="onclickMovieDetail(${idName})">
      <img class="bbb" src="${imgUrl}${imgAddress} alt="">
      <section class="text-contacts">
      
      <section class="text-title">${titleName}</section>
      <section class='text-rate'>${rateScore}</section>
      <section class='contains-category'>${matchedKeys}</section>
      </section>
    </div>`;
    }
    scrollEnd.innerHTML += HTMLdata;
  }
});

const getKeyByCategoryCodes = (movieCategoryCodes, contactsCategory) => {
  let matchedKeys = "";
  for (key in movieCategoryCodes) {
    if (contactsCategory.includes(movieCategoryCodes[key]))
      matchedKeys += key + " ";
  }
  return matchedKeys;
};
