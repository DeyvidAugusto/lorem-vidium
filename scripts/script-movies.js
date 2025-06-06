const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const list = document.querySelector('div.search-movie-list');
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query="`;

/* Paginação */

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;



getMovies(API_URL)
function getMovies(url) {
  lastUrl = url /* <- coisa de paginação*/
    fetch(url).then(res => res.json()). then(data => {
        if(data.results.length !== 0) {
          showMovies(data.results);
          currentPage = data.page; /* <- coisa de paginação*/
          nextPage = currentPage + 1; /* <- coisa de paginação*/
          prevPage = currentPage - 1; /* <- coisa de paginação*/
          totalPages = data.total_pages; /* <- coisa de paginação*/

          current.innerHTML = currentPage;/* <- coisa de paginação*/

          if(currentPage <= 1){ /* <- coisa de paginação*/
            prev.classList.add('disable');
            next;classList.remove('disable')
          }
          else if(currentPage >= totalPages){
            prev.classList.remove('disable');
            next;classList.add('disable')
          }
          else{
            prev.classList.remove('disable');
            next;classList.remove('disable')
          }
        }
        else {
          list.innerHTML = "<h1 class='no-results'>No Results Found</h1>";
        }
    })
}

function showMovies(data) {
    list.innerHTML = "";

    data.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('search-movie-list-item');
        movieEl.innerHTML = `
        <img class="serch-movie-list-item-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/> 

        <span class="search-movie-list-item-title">
            ${movie.title}
        </span>
        <span class="hidden-id">
            ${movie.id}
        </span>
        <button class="search-movie-list-item-button">
            Watch
        </button>`

    list.appendChild(movieEl);
    })
}
/* Mandando o movie ID para criar a pagina do filme */
document.addEventListener('click', function(e) {
  if (e.target && e.target.classList.contains('search-movie-list-item-button')) {
    const movieId = e.target.parentElement.querySelector('.hidden-id').textContent;
    localStorage.setItem('selectedMovieId', movieId);
    window.location.href = 'about.html';
  }
});


/* Filtragem por genero */

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
          fetch(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
              .then(res => res.json())
              .then(data => {
                  showMovies(data.results);
              });
          highlightSelection();
      });
      tagEl.appendChild(t);
  })
}

function highlightSelection() {
    document.querySelectorAll('.tag').forEach(tag => {
      tag.classList.remove('highlight');
    })
    if(selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
          const highlightedTag = document.getElementById(id);
          highlightedTag.classList.add('highlight');
        })
    }
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


/* Paginação */
prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page){
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length -1].split('=');
  if(key[0] != 'page'){
    let url = lastUrl + '&page=' + page
    getMovies(url)
  }
  else {
    key[1] = page.toString();
    let a = key.join('=');
    queryParams[queryParams.length -1] = a;
    let b = queryParams.join('&');
    let url = urlSplit[0] +'?'+ b;
    getMovies(url)
  }
}

document.getElementById('nav-ball').addEventListener('click', function (e) {
    e.stopPropagation(); 
    const menu = document.getElementById('nav-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function(e) {
    const navBall = document.getElementById('nav-ball');
    const menu = document.getElementById('nav-menu');
    if (menu.style.display === 'block' && !navBall.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});