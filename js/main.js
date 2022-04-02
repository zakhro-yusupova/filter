const elMForm = document.querySelector(".mform");
const elForm = document.querySelector(".form");
const elSelectMovie = document.querySelector(".select-movie");
const elSelect = document.querySelector(".select");
const elMovieBtn = document.querySelector(".button-movie");
const elBtn = document.querySelector(".button");
const elInput = document.querySelector(".input");
const elList = document.querySelector(".list");
const elBMList = document.querySelector(".bookmark-list");
const elJsBtn = document.querySelectorAll(".js-btn");
let bookMark = [];

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
    let newTime = document.createElement("time");
    let newText = document.createElement("p");
    let newBookMarkBtn = document.createElement("button");
    let newImgBookMark = document.createElement("img");
    newHeading.textContent = film.title.split(" ").slice(0 , 3).join(" ");
    newText.textContent = film.overview.split(" ").slice(0 ,4).join(" ") + "...";
    newTime.textContent = dateFormat(film.release_date);
    newBookMarkBtn.textContent = "Bookmark ";

    elForm.setAttribute("class", " d-flex justify-content-between align-items-center")
    elInput.setAttribute("class", "form-control w-75 my-5 ms-5 bg-dark text-danger text-center ms-5");
    elSelect.setAttribute("class", "form-select w-50 my-5 ms-5 bg-dark text-danger text-center");
    elBtn.setAttribute("class", "btn btn-danger px-3 ms-2 h-25");
    newItem.setAttribute("class", "card bg-dark bg-opacity-50");
    newItem.setAttribute("style", "width: 17rem");
    newImg.setAttribute("src", film.poster);
    newImg.setAttribute("class", "list__img");
    newDiv.setAttribute("class", "card-body text-light fs-6");
    newHeading.setAttribute("class", "my-2 h4 text-warning fw-bold ");
    newTime.setAttribute("datetime", "2022-03-12");

    newBookMarkBtn.setAttribute("class", "btn btn-dark border-warning mt-3 align-items-center");
    newBookMarkBtn.setAttribute("style", "display: block");
    newBookMarkBtn.classList.add("bookmark-btn");
    newBookMarkBtn.dataset.filmId = film.id;
    newImgBookMark.setAttribute("class", "ms-2");
    newImgBookMark.setAttribute("src", "./images/bookmark.png");


    newBookMarkBtn.appendChild(newImgBookMark);
    newDiv.appendChild(newHeading);
    newDiv.appendChild(newText);
    newDiv.appendChild(newTime);
    newDiv.appendChild(newBookMarkBtn);
    newItem.appendChild(newImg);
    newItem.appendChild(newDiv);
    element.appendChild(newItem);
  })
}

function renderBookMark(arr, element){

  element.innerHTML = "";

  arr.forEach(film => {

    const newItem = document.createElement("li");
    const newImg = document.createElement("img");
    const newTitle = document.createElement("h3");
    const newBtn = document.createElement("button");

    newTitle.textContent = film.title;
    newBtn.textContent = "Delete";

    newItem.setAttribute("class", "d-flex justify-content-between mb-3");
    newItem.setAttribute("style", "width: 17rem");
    newTitle.setAttribute("class", "h4 text-warning fw-bold");
    newBtn.setAttribute("class", "btn-dark border-danger text-danger ms-2");
    newBtn.dataset.deleteId = film.id;

    newItem.appendChild(newTitle);
    newItem.appendChild(newBtn);
    element.appendChild(newItem);

  })
}

elList.addEventListener("click", evt => {

  const bookmarkBtn = evt.target.matches(".bookmark-btn");
  if(bookmarkBtn){
    const filmId = evt.target.dataset.filmId;

    const findFilm = films.find( e => e.id === filmId);

    if (!bookMark.includes(findFilm)) {
      bookMark.push(findFilm)
    }


    renderBookMark (bookMark, elBMList);
  }
})

elForm.addEventListener("submit", evt =>{
  evt.preventDefault();

  const selectVal = elSelect.value;
  let filterFilms = selectVal == "all genres" ? films : films.filter(element => element.genres.includes(selectVal));

  renderFilms(filterFilms, elList);
})

elInput.addEventListener("input", function(e){
  let searchedArr = films.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
  renderFilms(searchedArr, elList);
})

elBMList.addEventListener("click", (evt) => {
  // elBMList.innerHTML = ""
  if (evt.target.matches(".delete-btn")){
   const deleteId = evt.target.dataset.deleteId;
   console.log(deleteId);
   bookMark = bookMark.filter(e => e.id !== deleteId);

   renderBookMark(bookMark, elBMList);
  }
})

renderFilms(films, elList);
renderGenes(films , elSelect);