function getMovieId() {
    return localStorage.getItem('selectedMovieId');
}

const API_KEY = "0a5670fe15bf27ff26d20f707806c967";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const MOVIE_URL = `${BASE_URL}/movie`;
const list = document.querySelector('div.search-movie-list');
const listCast = document.querySelector('div.search-cast-list');
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const movieId = getMovieId();

getMovieDetails(movieId);


function getMovieDetails(id) {
    fetch(`${MOVIE_URL}/${id}?api_key=${API_KEY}`).then(res => res.json()).then(data => {
        showMovieDetail(data);
    });
}

function showMovieDetail(movie) {
    list.innerHTML = "";

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-detail');
    movieEl.innerHTML = `
    <img class="movie-detail-img" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}"/> 

    <h2 class="movie-detail-title">
        ${movie.title}
    </h2>
    <button class="know-more" id="${movie.id}">Watch Trailer</button>

    <p class="movie-detail-overview">
        ${movie.overview}
    </p>`;


    list.appendChild(movieEl);

    document.getElementById(movie.id).addEventListener('click', () => {
        console.log(movie.id);
        openNav(movie)
    })
};

const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/'+id+'/videos?api_key='+API_KEY).then(res => res.json()).then(videodata => {
    document.getElementById("myNav").style.display = "block";
    console.log(videodata);
    if(videodata){
        document.getElementById("myNav").style.width = "100%";
        if(videodata.results.length > 0) {
            var embed = [];
            var dots = [];
            videodata.results.forEach((video, idx) => {
                let {name, key, site} = video;
                if (site == "YouTube"){

                    embed.push(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`);
                
                    dots.push(`<span class="dot">${idx + 1}</span>`)
                }
            })

            var content = `
            <h1 class="no-results">${movie.original_title}</h1>
            <br/>
            
            ${embed.join('')}
            <br/>

            <div class="dots">${dots.join('')}</div>

            `
            overlayContent.innerHTML = embed.join('')
            activeSlide = 0;
            showVideos();
        }else{
            overlayContent.innerHTML = '<h1 class="no-results">No Results Found</h1>';
        }
    }
    })
}

  function closeNav() {
    document.getElementById("myNav").style.display = "none";
  }

    var activeSlide = 0;
    var totalVideos = 0;

function showVideos() {
    let embedClasses = document.querySelectorAll('.embed');
    let dots = document.querySelectorAll('.dot');
    totalVideos = embedClasses.length;
    embedClasses.forEach((embedTag, idx) => {
        if(activeSlide == idx){
            embedTag.classList.add('show');
            embedTag.classList.remove('hide');
        }
        else{
            embedTag.classList.add('hide');
            embedTag.classList.remove('show');
        }
    })
}

    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    leftArrow.addEventListener('click', () => {
        if(activeSlide > 0){
            activeSlide--;
        }
        else{
            activeSlide = totalVideos -1;
        }
        showVideos();
    })

    rightArrow.addEventListener('click', () => {
        if(activeSlide < (totalVideos -1)){
            activeSlide++;
        }
        else{
            activeSlide = 0;
        }
        showVideos();
    })

getMovieCredits(movieId);

function getMovieCredits(id) {
    fetch(`${MOVIE_URL}/${id}/credits?api_key=${API_KEY}`).then(res => res.json()).then(data => {
        showMovieCredits(data);
    });
}

function showMovieCredits(movie) {
    listCast.innerHTML = "";
    movie.cast.forEach(castMember => {
        if(castMember.known_for_department == "Acting") {
            const castEl = document.createElement('div');
            castEl.classList.add('movie-detail-cast');
            castEl.innerHTML = `
            <img class="movie-cast-img" src="${IMG_URL}${castMember.profile_path}" alt="${castMember.name}"/> 

            <h2 class="movie-cast-name">
                ${castMember.name}
            </h2>`;
            listCast.appendChild(castEl);
        }
    });
}

