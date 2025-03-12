const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/tv?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const list = document.querySelector('div.search-movie-list');
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query="`;

getSeries(API_URL)
function getSeries(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results);
    })
}

function showMovies(data) {
    list.innerHTML = "";

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('search-movie-list-item');
        movieEl.innerHTML = `
        <img class="serch-movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt=""/> 

        <span class="search-movie-list-item-title">
            ${movie.name}
        </span> 
        <button class="search-movie-list-item-button">
            Watch
        </button>`

    list.appendChild(movieEl);
    })
}

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];
const tagEl = document.getElementById('tags');
const selectedGenre = [];


setGenre();
function setGenre() {
  tagEl.innerHTML = '';
  genres.forEach(genre => {
      const t = document.createElement("div");
      t.classList.add("tag");
      t.id = genre.id;
      t.innerText = genre.name;
      t.addEventListener('click', () => {
          if(selectedGenre.length == 0) {
              selectedGenre.push(genre.id);
          }
          else {
              if(selectedGenre.includes(genre.id)) {
                  selectedGenre.forEach((id, idx) => {
                      if(id == genre.id) {
                          selectedGenre.splice(idx, 1);
                      }
                  })
              }
              else {
                  selectedGenre.push(genre.id);
              }
          }
          console.log(selectedGenre)
          fetch(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
              .then(res => res.json())
              .then(data => {
                  showMovies(data.results);
              });
      });
      tagEl.appendChild(t);
  })
}

/* Script de Pesquisa */

const frmPesquisa = document.querySelector('form');
frmPesquisa.onsubmit = (ev) => {
    ev.preventDefault();
    const pesquisa = ev.target.pesquisa.value;

    if (pesquisa == "") {
        alert("Preencha o campo de pesquisa!");
        return;
    }

    localStorage.setItem('pesquisa', pesquisa);
    window.location.href = 'results.html';
};