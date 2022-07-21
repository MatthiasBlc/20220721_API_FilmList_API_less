
const searchBar = document.getElementById("search");
const searchApi = document.getElementById("searchApi");
const submitBtn = document.getElementById("button");
const resultDiv = document.getElementById("result");
const popupDiv = document.getElementById("popup");

let movieData = [];


// ------------------------------------------------
// ------------Get Movie Data list ----------------
// ------------------------------------------------
submitBtn.addEventListener("click", () => {
  let finalUrl = getUrl();
  // console.log(finalUrl)
  getMovieData(finalUrl);
});

const getMovieData = (incomingUrl) => {
  fetch(incomingUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log((movieData = data.Search));
      movieDisplay();
      observe();
      const popupBtns = document.querySelectorAll("a");
      popupBtns.forEach((button) =>{
        button.addEventListener("click", () =>{
          readMore(button);
        })
      })
    });
};

const movieDisplay = () => {
  resultDiv.innerHTML = movieData
    .map(
      (movie) =>
        `
  <div class="card mb-4" style="width: 18rem;">
    <img src="${movie.Poster}" class="card-img-top" alt="">
    <div class="card-body d-flex flex-row justify-content-between">
      <h5 class="card-title">${movie.Title}</h5>
      <p class="card-text">${movie.Year}</p>
      </div>
      <a id="${movie.imdbID}" class="btn btn-primary">See more</a>
  </div>
  `
    )
    .join(" ");
};

const getUrl = () => {
  let searchContent = searchBar.value;
  let scApi = searchApi.value;
  // console.log(searchContent);
  let formatedSearchContent = searchContent.trim().replace(" ", "+");
  // console.log(formatedSearchContent);
  let url = `http://www.omdbapi.com/?s=${formatedSearchContent}&apikey=${scApi}`
  // console.log(url);
  return url;
};


// ------------------------------------------------
// ------------Popup acces and closing-------------
// ------------------------------------------------

const readMore = (button) => {
  let scApi = searchApi.value;
  fetch(`http://www.omdbapi.com/?i=${button.id}&apikey=${scApi}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      popupDiv.style.display = "flex";
      popupDiv.innerHTML = movieReadMore(data);
      closeButtonPopup();
    })
  
};

const movieReadMore = (data) => {
  return `
  <div class="card mb-3" style = "max-width: 540px; display: flex">
  <button type=button class='btn-close' id="close-button" data-bs-dismiss="alert" aria-label="Close"></button>
  <div class="column">
     <div class= "col-md-4">
     <img src ="${data.Poster}" class="card-img-top" alt="...">
     </div>
     <div class="col-md-8">
        <div class="card-body">
           <h5 class="card-title">${data.Title}</h5>
           <p class="card-text">${data.Plot}</p>
           <p class="card-text"><small class="text-muted">${data.Released}</small></p>
        </div>
     </div>
  </div>
  </div>
  `
  }

const closeButtonPopup = () => {
  let closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    popupDiv.style.display = "none";
    popupDiv.innerHTML = "";
  });
};


// ------------------------------------------------
// ------------Observer ---------------------------
// ------------------------------------------------

let observer = new IntersectionObserver(function (observables) {
  observables.forEach(function (observable) {
      if (observable.intersectionRatio > 0.5) {
          observable.target.classList.remove('not-visible')
          observer.unobserve(observable.target)
          console.log('Item visible')
      }
  })
}, {
  threshold: [0.5]
});

const observe = () => {
  let items = document.querySelectorAll('.card')
  items.forEach(function (item) {
      item.classList.add('not-visible')
      observer.observe(item)
  });
};



// ------------------------------------------------
// ------------lazy loading -----------------------
// ------------------------------------------------

// const testfonction = (arr) => {

// document.addEventListener("DOMContentLoaded", function () {
//   const filmObserver = new IntersectionObserver((entries, filmObserver) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const lazyFilm = entry.target
//         console.log("lazy loading ", lazyFilm)
//         lazyFilm.card = lazyFilm.dataset.card
//         lazyFilm.classList.remove("card");
//         filmObserver.unobserve(lazyFilm);
//       }
//     })
//   });
//   const arr = document.querySelectorAll('.card')
//   console.log(arr)
//   arr.forEach((v) => {
//     filmObserver.observe(v);
//   })
// })
// }