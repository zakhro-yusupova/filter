let elMForm = document.querySelector(".mform");
let elForm = document.querySelector(".form");
let elSelectMovie = document.querySelector(".select-movie");
let elSelect = document.querySelector(".select");
let elMovieBtn = document.querySelector(".button-movie");
let elBtn = document.querySelector(".button");
let elList = document.querySelector(".list");


function renderMovies(arr, element){

  let movies = [];

  arr.forEach( film =>  movies.push(film.title));

  movies.sort((a, b) =>{
    if (b > a){
      return -1
    }
  })

  movies.forEach(title => {
    let newOption = document.createElement("option");
    newOption.value = title;
    newOption.textContent = title;
    element.appendChild(newOption);
  })

}

function renderGenes(arr , element){

  let renderGeners = [];

  arr.forEach((film) => {

    film.genres.forEach(genre => {
      if(!renderGeners.includes(genre)){
        renderGeners.push(genre)
      }
    })
  })

  renderGeners.sort((a,b) => {
    if(b > a){
      return -1
    }
  })

  renderGeners.forEach(genre => {

    const newOption = document.createElement("option");
    newOption.value = genre;
    newOption.textContent = genre;
    element.appendChild(newOption);
  })

}

function renderFilms(arr, element){

  element.innerHTML = "";

  arr.forEach(film =>{
    let newItem = document.createElement("li");
    let newImg = document.createElement("img");
    let newDiv = document.createElement("div");
    let newHeading = document.createElement("h3");
    let newText = document.createElement("p");
    let newTime = document.createElement("time");
    let newSubList = document.createElement("ul");


    newHeading.textContent = film.title;
    newText.textContent = film.overview.split(" ").slice(0 ,10).join(" ") + "...";
    newTime.textContent = dateFormat(film.release_date);


    for(var genre of film.genres){

      var newSubItem = document.createElement("li");
      newSubItem.textContent = genre;
      newSubItem.setAttribute("class", "me-1");
      newSubList.appendChild(newSubItem);
    }


    elMForm.setAttribute("class", " d-flex justify-content-between align-items-center")
    elForm.setAttribute("class", " d-flex justify-content-between align-items-center")
    elSelectMovie.setAttribute("class", "form-control w-75 my-5 ms-5 bg-dark text-danger text-center");
    elSelect.setAttribute("class", "form-select w-50 my-5 ms-5 bg-dark text-danger text-center");
    elMovieBtn.setAttribute("class", "btn btn-danger px-3 ms-2 h-25");
    elBtn.setAttribute("class", "btn btn-danger px-3 ms-2 h-25");
    newItem.setAttribute("class", "card bg-dark bg-opacity-50");
    newItem.setAttribute("style", "width: 17rem");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img");
    newDiv.setAttribute("class", "card-body text-light fs-6");
    newHeading.setAttribute("class", "my-2 h4 text-warning fw-bold ")
    newTime.setAttribute("datetime", "2022-03-12");
    newSubList.setAttribute("class", "d-flex  flex-wrap list-unstyled fs-6 my-2 p-0 text-danger");


    newItem.appendChild(newImg);
    newItem.appendChild(newDiv);
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newText);
    newDiv.appendChild(newTime);
    newDiv.appendChild(newSubList);

    element.appendChild(newItem);

  })
}

elMForm.addEventListener("submit", evt =>{
  evt.preventDefault();

  let filterMovies = elSelectMovie.value == "all movies" ? films : films.filter(element => element.title.includes(elSelectMovie.value)) ;

  renderFilms(filterMovies, elList);
})


elForm.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = elSelect.value;
  let filterFilms = selectVal == "all genres" ? films : films.filter(element => element.genres.includes(selectVal))  ;

  renderFilms(filterFilms, elList);
})

renderFilms(films, elList);
renderMovies( films, elSelectMovie);
renderGenes(films , elSelect);
