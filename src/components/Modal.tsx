import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './MovieBox.css'
import { singleMovie } from './Types/app'
import { useInView } from 'react-intersection-observer'
import { useAnimation } from 'framer-motion'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { genre } from './Types/app'
import ReactPlayer from 'react-player'

type TModal = {
    Movie: singleMovie | null
    showModal: boolean
    setShowModal: (showModal: boolean) => void
}
function Modal({ Movie, showModal, setShowModal }: TModal) {
    const [fetchSeriesGenres, setFetchSeriesGenres] = useState <boolean>(false)
    const [fetchMoviesGenres, setFetchMoviesGenres] = useState<boolean>(false)
    const [checkMovieOrSeries, setCheckMovieOrSeries] = useState<string>('')
        const [videoID, SetVideID] = useState<number>(0)

    const [genres,setGenres]=useState<string[]>([])
    const key = 'e5a319653f57fe3b2a8b69afa1a4377f'

    const MovieConRef = useRef<HTMLDivElement | null>(null)
    const { ref, inView } = useInView()
    const {ref:videoModalRef,inView:videoModalInView}=useInView()
    const animate=useAnimation()
    
    const CloseModal = useCallback(() => {
        if (MovieConRef.current) {
            
            MovieConRef.current.addEventListener('click', (e) => {
                setShowModal(false)
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
        if (Movie) {
            const rate=Number(((Movie.vote_average/10)*100).toFixed(0))
            return rate
        }
        return 0
    }, [Movie])
    

    useEffect(() => {
        if(inView){
            animate.start({
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
        }
    },[inView,animate])


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
        if (Movie?.original_name !== undefined && Movie) {

            setFetchSeriesGenres(true)
            const filteredGenres = SeriesGenres?.filter((genre: genre) => Movie?.genre_ids.includes(genre.id));
            setGenres(filteredGenres?.map((genre: genre) => genre.name))
            SetVideID(Movie.id)
            setCheckMovieOrSeries('tv')

        } else if (Movie?.original_title !== undefined && Movie) {
            setFetchMoviesGenres(true)
            const filteredGenres=MoviesGenres?.filter((genre:genre)=>Movie?.genre_ids.includes(genre.id))
            setGenres(filteredGenres?.map((genre:genre)=>genre.name))
            SetVideID(Movie.id)
            setCheckMovieOrSeries('movie')

        } else {
            setFetchMoviesGenres(false)
            setFetchSeriesGenres(false)
            setGenres([])
        }
    }, [Movie, MoviesGenres, SeriesGenres])
    

    const fetchMovieVideo = () => {
    return axios.get(`https://api.themoviedb.org/3/${checkMovieOrSeries}/${videoID}/videos?api_key=${key}`);
}
    
    const { data: movieVideo } = useQuery({
        queryKey: ['movieVideoModal',videoID],
        queryFn: fetchMovieVideo,
        select: (data) => {
            return data.data.results[0]
        },
        enabled: videoID!==0,
        staleTime: 0,
        refetchOnWindowFocus: false
    });



    return (
        <div  className='container-fluid'>
            <div  className='row'>
                <div ref={MovieConRef} onClick={CloseModal} className={`p-0 col-12 modalCon ${showModal ? 'd-flex' : 'd-none'}  justify-content-center `}>
                    <motion.div ref={ref} animate={animate} className='col-7 d-flex MovieBoxCon flex-column'>
                        <div ref={ref} className='col-12 ModalImg rounded'>
                            <img alt={Movie?.title} src={`https://image.tmdb.org/t/p/w500${Movie?.poster_path}`} className="img-fluid w-100 h-100 " />
                            <div className='ModalImgShadow'></div>
                            <h1  className='col-12 ModalTitle '>{Movie?.title || Movie?.name}</h1>
                        </div>
                        <div className='col-12 d-flex flex-column align-items-center MovieInfoModal p-2'>
                            <p className='col-12'>{Movie?.overview}</p>
                            <div className='col-12 d-flex justify-content-center'>
                                <div className='col-auto rate d-flex align-items-center'>{MovieRate}% Match</div>
                                <div className='col-auto mx-5 d-flex justify-content-center'>
                                    {Movie?.adults?<div className='col-12 rounded text-center adult'>+18</div>:<div className='col-12 px-3 py-1 text-center adult rounded'>+13</div>}
                                </div>
                                <div className='col-auto d-flex'>
                                    {genres?.map((genre: string,i:number) => {
                                        return <div className='col-auto d-flex align-items-center ms-2'>
                                            {genre}
                                            {genres.length-1 !==i && <span style={{color:'gray',fontSize:'10px'}} className='ms-2 d-flex '>●</span>}
                                        </div>
                                    })}
                                </div>
                            </div>
                            <div ref={videoModalRef} className='col-6 d-flex modalVideoCon mt-3 rounded overflow-hidden '>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
                                    width='100%'
                                    height='100%'
                                    controls={false}
                                    playing={videoModalInView}
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
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
    </div>
)
}

export default Modal