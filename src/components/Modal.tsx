import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './MovieBox.css'
import { TMovie, singleMovie } from './Types/app'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { genre } from './Types/app'
import ReactPlayer from 'react-player'
import { SoundOutlined } from '@ant-design/icons'
import { StyledButton } from './StyledComponents/StyledButton'
import { useDispatch, useSelector } from 'react-redux'
import { setTheMovie } from './redux/Movie'

type TModal = {
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}
function Modal({  showModal, setShowModal,  }: TModal) {
    const movie = useSelector((state:{movie:TMovie}) => state.movie.movie)

    const dispatch=useDispatch()
    const key = 'e5a319653f57fe3b2a8b69afa1a4377f'
    const [fetchSeriesGenres, setFetchSeriesGenres] = useState <boolean>(false)
    const [fetchMoviesGenres, setFetchMoviesGenres] = useState<boolean>(false)
    const [checkMovieOrSeries, setCheckMovieOrSeries] = useState<string>('')
    const [videoID,setVideoId]=useState<number>(0)
    const [mute,setMute]=useState<boolean>(false)
    const [VolumeBarMuteDisplay,setVolumeBarMuteDisplay]=useState<string>('d-none')
    const SimilarBoxRef :React.MutableRefObject<HTMLDivElement[]> =useRef([])
    const SimilarBoxRefOverlay :React.MutableRefObject<HTMLDivElement[]> =useRef([])
    const SimilarBoxButtonRef :React.MutableRefObject<HTMLButtonElement[]> =useRef([])
    const [genres,setGenres]=useState<string[]>([])

    const MovieConRef = useRef<HTMLDivElement | null>(null)
    const { ref, inView } = useInView()
    const {ref:videoModalRef,inView:videoModalInView}=useInView()
    const animate=useAnimation()
    const animate2=useAnimation()

    const CloseModal = useCallback(() => {
        if (MovieConRef.current) {
            MovieConRef.current.addEventListener('click', (e) => {
                if (e.target === MovieConRef.current) {
                    setShowModal(false)
            }
            })
        }
    }, [setShowModal])
    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setShowModal(false)
            }
        })
    }, [setShowModal])
    const MovieRate = useMemo((): number => {
        if (movie) {
            const rate=Number(((movie.vote_average/10)*100).toFixed(0))
            return rate
        }
        return 0
    }, [movie])
    

    useEffect(() => {
        if(inView){
            animate.start({
                transition: {
                    duration: 0.5
                },
                top: '50px',
                
            })
            animate2.start({
                transition: {
                    duration: 0.5
                },
                top: '50px',
                
            })
        }
        if(!inView){
            animate.start({
                opacity: 1,
                top: '-100%',
                transition: {
                    duration: 0.5
                },
            })
            animate2.start({
                opacity: 1,
                top: '-100%',
                transition: {
                    duration: 0.5
                },
            })
        }
    },[inView,animate,animate2])


    function FetchMoviesGenres(){
return axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
    } 

    const { data: MoviesGenres } = useQuery({
        queryKey: ['MovieGenres'],
        queryFn: FetchMoviesGenres,
        enabled: fetchMoviesGenres === true,
        select: (data) => {
            return data.data.genres
        }
    });

    function FetchSeriesGenres(){
return axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en-US`)
    } 

    const { data: SeriesGenres } = useQuery({
        queryKey: ['MovieGenres'],
        queryFn: FetchSeriesGenres,
        enabled: fetchSeriesGenres === true,
        select: (data) => {
            return data.data.genres
        }
    });


    useEffect(() => {
        if (movie?.original_name !== undefined && movie) {

            setFetchSeriesGenres(true)
            const filteredGenres = SeriesGenres?.filter((genre: genre) => movie?.genre_ids.includes(genre.id));
            setGenres(filteredGenres?.map((genre: genre) => genre.name))
            setCheckMovieOrSeries('tv')
            setVideoId(movie?.id)

        } else if (movie?.original_title !== undefined && movie) {
            setFetchMoviesGenres(true)
            const filteredGenres=MoviesGenres?.filter((genre:genre)=>movie?.genre_ids.includes(genre.id))
            setGenres(filteredGenres?.map((genre:genre)=>genre.name))
            setCheckMovieOrSeries('movie')
            setVideoId(movie?.id)

        } else {
            setFetchMoviesGenres(false)
            setFetchSeriesGenres(false)
            setGenres([])
        }
    }, [movie, MoviesGenres, SeriesGenres])
    

    const fetchMovieVideo = () => {
    return axios.get(`https://api.themoviedb.org/3/${checkMovieOrSeries}/${videoID}/videos?api_key=${key}`);
}
    
    const { data: movieVideo } = useQuery({
        queryKey: ['movieVideoModal',videoID],
        queryFn: fetchMovieVideo,
        select: (data) => {
            return data.data.results[0]
        },
        enabled: !!movie?.id,
        staleTime: 0,
        refetchOnWindowFocus: false
    });
    

const handleMute = useCallback(() => {
    setMute(!mute)

}, [mute ])

    useEffect(() => {
    if (mute) {
        setVolumeBarMuteDisplay('d-flex')
    } else {
        setVolumeBarMuteDisplay('d-none')
    }
    }, [mute])
    

        const fetchSimilar = () => {
    return axios.get(`https://api.themoviedb.org/3/${checkMovieOrSeries}/${videoID}/similar?api_key=${key}`);
    }
    const { data: similarMovies } = useQuery({
        queryKey: ['similarMovies',videoID],
        queryFn: fetchSimilar,
        select: (data) => {
            return data.data.results
        },
        enabled: !!movie,
        staleTime: 0,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const current=SimilarBoxRef.current
        const currentOverlay = SimilarBoxRefOverlay.current
        const currentButton = SimilarBoxButtonRef.current
        if (current&& currentOverlay && currentButton) {
            current.map((e:any,i:number) => {
                if (e) {
                    e.addEventListener('mouseenter', (e: React.MouseEvent<HTMLDivElement>) => {
                        currentOverlay[i].style.width = '100%'
                        currentOverlay[i].style.height = '100%'
                        currentOverlay[i].style.transition = '0.5s'
                        currentButton[i].style.display = 'block'
                        currentButton[i].style.transition = '0.5s'

                    })
                    
                    e.addEventListener('mouseleave', (e: React.MouseEvent<HTMLDivElement>) => {
                        currentOverlay[i].style.width = '0'
                        currentOverlay[i].style.height = '0'
                        currentOverlay[i].style.transition = '0.5s'
                        currentButton[i].style.display = 'none'
                        currentButton[i].style.transition = '0.5s'

                    })
                }
                return null
            })
        }
    },)

    const setMovieInSimilarBox=useCallback((movie:singleMovie)=>{
        
        dispatch(setTheMovie(movie))
    }, [dispatch])
    

    return (
        <div  className='container-fluid'>
            <div  className='row'>
                <div ref={MovieConRef} onClick={CloseModal} className={`p-0  col-12 modalCon ${showModal ? 'd-flex' : 'd-none'}  justify-content-md-around align-items-center flex-md-row flex-column `}>
                    <motion.div ref={ref} animate={animate} className='col-md-6 col-12 d-flex MovieBoxCon flex-column'>
                        <div ref={ref} className='col-12 ModalImg rounded'>
                            <img alt={movie?.title} src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className="img-fluid w-100 h-100 " />
                            <div className='ModalImgShadow'></div>
                            <h1  className='col-12 ModalTitle '>{movie?.title || movie?.name}</h1>
                        </div>
                        <div className='col-12 d-flex flex-column align-items-center MovieInfoModal p-2'>
                            <p className='col-12'>{movie?.overview}</p>
                            <div className='col-12 d-flex justify-content-center flex-wrap '>
                                <div className='col-auto rate d-flex align-items-center'>{MovieRate}% Match</div>
                                <div className='col-auto mx-5 d-flex justify-content-center'>
                                    {movie?.adults?<div className='col-12 rounded text-center adult'>+18</div>:<div className='col-12 px-3 py-1 text-center adult rounded'>+13</div>}
                                </div>
                                <div className='col-auto d-flex'>
                                    {genres?.map((genre: string,i:number) => {
                                        return <div key={i} className='col-auto d-flex align-items-center ms-2'>
                                            {genre}
                                            {genres.length-1 !==i && <span style={{color:'gray',fontSize:'10px'}} className='ms-2 d-flex '>●</span>}
                                        </div>
                                    })}
                                </div>
                                <div className='col-auto ms-5 d-flex align-items-center '>{movie?.release_date || movie?.first_air_date }</div>
                            </div>
                            {movieVideo!==undefined && <div ref={videoModalRef} className='col-6 d-flex modalVideoCon mt-3 rounded overflow-hidden '>
                                <div onClick={handleMute} className='col-auto d-flex align-items-center justify-content-center VideoModalControlVolume p-2'>
                                    <SoundOutlined />
                                    <div  className={`col-auto barVolumeControl ${VolumeBarMuteDisplay}`}>|</div>
                                </div>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
                                    width='100%'
                                    height='100%'
                                    controls={false}
                                    loop
                                    playing={videoModalInView}
                                    muted={mute}
                                    
                                    config={{
                                        youtube: {
                                            playerVars: {
                                                showinfo: 0,
                                                rel: 0,
                                                modestbranding: 0,
                                                controls: 0,
                                                
                                            }
                                        }
                                    }}
                                />
                            </div>}
                        </div>
                    </motion.div>
                    <motion.div animate={animate2} className='col-md-3 col-10 d-flex similar flex-md-column flex-row'>
                        <h1 className='col-12 similarTitle'>Similar </h1>
                        <div className='col-12 similarCon d-flex flex-md-column flex-row'>
                            {similarMovies?.map((movie: singleMovie,i:number) => {
                            return <div ref={e=>SimilarBoxRef.current[i] = e!} key={movie?.id} className='col-md-12 col-12 mt-md-0 mt-5 similarImgBox mb-2 d-flex flex-column'>
                                <img alt={movie?.title} src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} className="img-fluid w-100 h-100 " />
                                <div ref={e => SimilarBoxRefOverlay.current[i] = e!} className='d-flex similarImgBoxShadow justify-content-center align-items-center overflow-hidden'>
                                    <StyledButton ref={e=>SimilarBoxButtonRef.current[i] = e!} onClick={()=>setMovieInSimilarBox(movie)} className='col-4 p-2 '>Show Info</StyledButton>
                                </div>
                            </div>
                        })}
                        </div>
                    </motion.div>
                </div>
            </div>
    </div>
)
}

export default Modal