import HomeVideo from "./HomeVideo"
import MoviesBox from "./MoviesBox"
import './MovieBox.css'
import { Page } from "./Types/app"
import Modal from "./Modal"




type IHome = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
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
function Home({ popularMovies, popularMoviesSuccess, PopularfetchNextPage, TopRatedMovies, fetchTopRatedNextPage, UpcomingMovies, fetchUpcomingNextPage, playingMovies, fetchPlayingNextPage, popularSeries, fetchPopularSeries, AirSeries, fetchAirSeries, OnTheAirSeries, fetchOnTheAirSeries, TopRatedSeries, fetchTopRatedSeries,showModal ,setShowModal,LargeVideo}: IHome) {


    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-12 d-flex flex-column p-0 position-relative">
                    
                    <HomeVideo Success={popularMoviesSuccess} Movies={LargeVideo as Page[]} />
                    <div className="col-12 p-0 position-relative MoviesContainer">
                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="Playing Now Movies" movies={playingMovies as Page[]} fetchNextPage={fetchPlayingNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} title="Popular Movies" movies={popularMovies as Page[]} fetchNextPage={PopularfetchNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="Top Rated Movies" movies={TopRatedMovies as Page[]} fetchNextPage={fetchTopRatedNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="Upcoming Movies" movies={UpcomingMovies as Page[]} fetchNextPage={fetchUpcomingNextPage} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="Popular Series" movies={popularSeries as Page[]} fetchNextPage={fetchPopularSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="Airing Series" movies={AirSeries as Page[]} fetchNextPage={fetchAirSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal}  title="On The Air Series" movies={OnTheAirSeries as Page[]} fetchNextPage={fetchOnTheAirSeries} />

                        <MoviesBox showModal={showModal} setShowModal={setShowModal} title="Top Rated Series" movies={TopRatedSeries as Page[]} fetchNextPage={fetchTopRatedSeries} />

                    </div>
                    <Modal showModal={showModal} setShowModal={setShowModal} />

                </div>
            </div>
        </div>
)
}

export default Home