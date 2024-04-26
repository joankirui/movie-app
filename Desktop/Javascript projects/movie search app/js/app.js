const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a620d2010d6df084e8a28f2a5b5e21c5&page=1";

// most popular movie
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=a620d2010d6df084e8a28f2a5b5e21c5&query=";
// searched movie
const movieBox = document.querySelector('#movie-box');

const getMovies = async(api) => {
    const response = await fetch(api);
    const data = await response.json();
    console.log(data)
    showMovies(data.results)
}

const showMovies = (data) => {
    movieBox.innerHTML = "";
    // empty the moviebox
    data.forEach(element => {
        const imagePath = element.poster_path === null ? "img/image-missing.png" : IMGPATH + element.poster_path;
        const box = document.createElement("div")
        box.classList.add("box")
        box.innerHTML = `
        <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2>${element.original_title} </h2>
                        <span> 
                        ${element.vote_average}<span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                    ${element.overview}
                    
                    </p>
                 </div>
                 `;
                 movieBox.appendChild(box);
    });
    

}

document.querySelector("#search").addEventListener(
    "keyup",
    function(event){
        if(event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } 
        else {
            getMovies(APIURL)
        }
    }
)
// init call
getMovies(APIURL)