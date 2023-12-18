import HomeVideo from "./HomeVideo"
import Modal from "./Modal"
import MoviesBox from "./MoviesBox"
import { Page, singleMovie } from "./Types/app"
import './MovieBox.css'
import { useEffect, useState } from "react"



type TMoviesVideo = {
    TopRatedMovies?:Page[]
    popularMovies?: Page[]
    UpcomingMovies?: Page[]
    playingMovies?: Page[]
    popularSeries?:Page[]
    AirSeries?: Page[]
    OnTheAirSeries?: Page[]
    TopRatedSeries?:Page[]
    showModal: boolean
    setMovie: (movie: singleMovie | null) => void
    setShowModal: (showModal: boolean) => void
    Movie: singleMovie | null
    PopularfetchNextPage?: () => void
    fetchTopRatedNextPage?: () => void
    fetchUpcomingNextPage?: () => void
    fetchPlayingNextPage?: () => void
    Success: boolean
    LargeVideo: Page[]
    
}
function MoviesPage({ popularMovies, showModal, setShowModal, setMovie, PopularfetchNextPage, Movie, TopRatedMovies, fetchTopRatedNextPage, UpcomingMovies, fetchUpcomingNextPage, playingMovies, fetchPlayingNextPage, Success, LargeVideo, popularSeries,TopRatedSeries,AirSeries,OnTheAirSeries }: TMoviesVideo) {
    
    const [MovieOrSeries, setMovieOrSeries] = useState("")

    useEffect(() => {
        if (TopRatedMovies) {
        setMovieOrSeries('Movies')
    } else if (popularSeries) {
        setMovieOrSeries('Series')
    }
}, [ popularSeries, TopRatedMovies])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className='col-12 d-flex flex-column p-0 position-relative'>
                <HomeVideo Success={Success} Movies={LargeVideo as Page[]} />
                    <div className="col-12 p-0 position-relative MoviesContainer">
                        <MoviesBox
                    Movie={Movie}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setMovie={setMovie}
                    title={`Popular ${MovieOrSeries}`}
                    movies={popularMovies as Page[]}
                    fetchNextPage={PopularfetchNextPage}
                    series={popularSeries as Page[]}
                        
                        />

                <MoviesBox
                    Movie={Movie}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setMovie={setMovie}
                    title={`Top Rated ${MovieOrSeries}`}
                    movies={TopRatedMovies as Page[]}
                    fetchNextPage={fetchTopRatedNextPage}
                    series={TopRatedSeries as Page[]}
                        />
                
                <MoviesBox
                    Movie={Movie}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setMovie={setMovie}
                    title={`${(TopRatedMovies&&TopRatedMovies.length>0) ?"PLaying Now":"Airing "} ${MovieOrSeries}`}
                    movies={UpcomingMovies as Page[]}
                    fetchNextPage={fetchUpcomingNextPage}
                    series={AirSeries as Page[]}
                    
                    />
                
                <MoviesBox
                    Movie={Movie}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setMovie={setMovie}
                    title={`${(TopRatedMovies&&TopRatedMovies.length>0) ?"PLaying Now":"On The Air "} ${MovieOrSeries}`}
                    movies={playingMovies as Page[]}
                    fetchNextPage={fetchPlayingNextPage}
                    series={OnTheAirSeries as Page[]}
                        />
                </div>
            </div>
            </div>
            
            <Modal setMovie={setMovie} showModal={showModal} setShowModal={setShowModal} Movie={Movie}/>

    </div>
)
}

export default MoviesPage