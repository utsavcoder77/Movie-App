class Movie {
    constructor(title, year, release, genre, director, writer, plot, poster) {
        this.title = title;
        this.year = year;
        this.release = release;
        this.genre = genre;
        this.director = director;
        this.writer = writer;
        this.poster = poster;
    }
};

class MovieApp {
    constructor() {
        this.searchQuery = "";
        this.resultMovie = null;
        this.recentMovie = [];
        this.activeMovie = null;
    }

    showResult() {
        const searchResultWrapper = document.querySelector(".search-result-wrapper");
        searchResultWrapper.innerHTML(`
        <div>
            <img src="${this.resultMovie.poster}"
                alt="">
            <h3>${this.resultMovie.title}</h3>
            <p>${this.resultMovie.genre}</p>
        </div>
        `)
    }

    async searchMovie(event){
        if(event.code === "Enter"){
            event.preventDefault();
            const searchInput = document.querySelector("input");
            const searchQuery = searchInput.value;
            const apiEndpoint = `http://www.omdbapi.com/?t=${searchQuery}&apikey=45112140`;
            const response = await fetch(apiEndpoint);
            const result = await response.json();
            if(result){
                console.log(result);
                this.resultMovie = new Movie(
                    result.Title, 
                    result.Year,
                    result.Released,
                    result.Genre,
                    result.Director,
                    result.Writer,
                    result.Plot,
                    result.Poster
                );

                const searchResultWrapper = document.querySelector(".search-result-wrapper");
                searchResultWrapper.innerHTML = `
                <div>
                    <img src="${this.resultMovie.poster}"
                        alt="">
                    <h3>${this.resultMovie.title}</h3>
                    <p>${this.resultMovie.genre}</p>
                </div>
                `;
            }
        }
    }

    attachSearchEventListener() {
        const searchInput = document.querySelector("input");
        this.searchInput = searchInput;
        searchInput.addEventListener("keydown", this.searchMovie)
    }

}

const movieAppObject = new MovieApp();
movieAppObject.attachSearchEventListener

const movieObject = new Movie(
    "Guardians of the Galaxies Vol. 2",
    "2024",
    "05 May 2017",
    "Action, Adventure, Comedy",
    "James Gunn",
    "James Gunn, Dan Abnett, Andy Lanning",
    "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
    "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
);

    