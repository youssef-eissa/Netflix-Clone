import HomeVideo from "./HomeVideo"
import MoviesBox from "./MoviesBox"
import './MovieBox.css'
import logo from '../assets/icons8-netflix-logo-ios-16-filled/icons8-netflix-logo-100.svg'
import { Page,singleMovie } from "./Types/app"
import HomeFooter from "./HomeFooter"
import Modal from "./Modal"
import { useState } from "react"



type IHome = {
    popularMovies: Page[]
    TopRatedMovies: Page[]
    UpcomingMovies: Page[]
    playingMovies: Page[]
    popularSeries:Page[]
    AirSeries: Page[]
    OnTheAirSeries: Page[]
    TopRatedSeries:Page[]
    popularMoviesSuccess: boolean
    UpcomingMoviesSuccess: boolean
    TopRatedMoviesSuccess: boolean
    playingMoviesSuccess: boolean
    fetchPlayingNextPage: () => void
    PopularfetchNextPage: () => void
    fetchTopRatedNextPage: () => void
    fetchUpcomingNextPage: () => void
    fetchPopularSeries: () => void
    fetchAirSeries: () => void
    fetchTopRatedSeries: () => void
    fetchOnTheAirSeries: () => void

}
function Home({ popularMovies, popularMoviesSuccess, PopularfetchNextPage, TopRatedMovies, fetchTopRatedNextPage, UpcomingMovies, fetchUpcomingNextPage, playingMovies, fetchPlayingNextPage, popularSeries, fetchPopularSeries, AirSeries, fetchAirSeries, OnTheAirSeries, fetchOnTheAirSeries, TopRatedSeries, fetchTopRatedSeries }: IHome) {
    
    const [Movie, setMovie] = useState<singleMovie | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    

    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-12 d-flex flex-column p-0 position-relative">
                    <div className="col-12 d-flex HomeNavBar">
                        <div className="col-3 ps-3">
                            <img alt="logo" src={logo} className="img-fluid " />
                        </div>
                    </div>
                    <HomeVideo popularMoviesSuccess={popularMoviesSuccess} popularMovies={popularMovies as Page[]} />
                    <div className="col-12 p-0 position-relative MoviesContainer">
                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Playing Now Movies" movies={playingMovies as Page[]} PopularfetchNextPage={fetchPlayingNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Popular Movies" movies={popularMovies as Page[]} PopularfetchNextPage={PopularfetchNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Top Rated Movies" movies={TopRatedMovies as Page[]} PopularfetchNextPage={fetchTopRatedNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Upcoming Movies" movies={UpcomingMovies as Page[]} PopularfetchNextPage={fetchUpcomingNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Popular Series" movies={popularSeries as Page[]} PopularfetchNextPage={fetchPopularSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Airing Series" movies={AirSeries as Page[]} PopularfetchNextPage={fetchAirSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="On The Air Series" movies={OnTheAirSeries as Page[]} PopularfetchNextPage={fetchOnTheAirSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} setMovie={setMovie} title="Top Rated Series" movies={TopRatedSeries as Page[]} PopularfetchNextPage={fetchTopRatedSeries} />

                    </div>
                    <HomeFooter />
                    <Modal showModal={showModal} setShowModal={setShowModal} Movie={Movie}/>
                    

                </div>
            </div>
        </div>
)
}

export default Home