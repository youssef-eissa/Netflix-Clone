import HomeVideo from "./HomeVideo"
import MoviesBox from "./MoviesBox"
import './MovieBox.css'
import { Page,singleMovie } from "./Types/app"
import Modal from "./Modal"




type IHome = {
    showModal: boolean
    setMovie: (movie: singleMovie | null) => void
    setShowModal: (showModal: boolean) => void
    Movie: singleMovie | null
    popularMovies: Page[]
    TopRatedMovies: Page[]
    UpcomingMovies: Page[]
    playingMovies: Page[]
    popularSeries:Page[]
    AirSeries: Page[]
    OnTheAirSeries: Page[]
    TopRatedSeries:Page[]
    popularMoviesSuccess: boolean

    fetchPlayingNextPage: () => void
    PopularfetchNextPage: () => void
    fetchTopRatedNextPage: () => void
    fetchUpcomingNextPage: () => void
    fetchPopularSeries: () => void
    fetchAirSeries: () => void
    fetchTopRatedSeries: () => void
    fetchOnTheAirSeries: () => void
    LargeVideo:Page[]

}
function Home({ popularMovies, popularMoviesSuccess, PopularfetchNextPage, TopRatedMovies, fetchTopRatedNextPage, UpcomingMovies, fetchUpcomingNextPage, playingMovies, fetchPlayingNextPage, popularSeries, fetchPopularSeries, AirSeries, fetchAirSeries, OnTheAirSeries, fetchOnTheAirSeries, TopRatedSeries, fetchTopRatedSeries,showModal ,setMovie,setShowModal,Movie,LargeVideo}: IHome) {


    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-12 d-flex flex-column p-0 position-relative">
                    
                    <HomeVideo Success={popularMoviesSuccess} Movies={LargeVideo as Page[]} />
                    <div className="col-12 p-0 position-relative MoviesContainer">
                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Playing Now Movies" movies={playingMovies as Page[]} fetchNextPage={fetchPlayingNextPage} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Popular Movies" movies={popularMovies as Page[]} fetchNextPage={PopularfetchNextPage} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Top Rated Movies" movies={TopRatedMovies as Page[]} fetchNextPage={fetchTopRatedNextPage} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Upcoming Movies" movies={UpcomingMovies as Page[]} fetchNextPage={fetchUpcomingNextPage} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Popular Series" movies={popularSeries as Page[]} fetchNextPage={fetchPopularSeries} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Airing Series" movies={AirSeries as Page[]} fetchNextPage={fetchAirSeries} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="On The Air Series" movies={OnTheAirSeries as Page[]} fetchNextPage={fetchOnTheAirSeries} />

                        <MoviesBox Movie={Movie} showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Top Rated Series" movies={TopRatedSeries as Page[]} fetchNextPage={fetchTopRatedSeries} />

                    </div>
                    <Modal setMovie={setMovie} showModal={showModal} setShowModal={setShowModal} Movie={Movie}/>

                </div>
            </div>
        </div>
)
}

export default Home