import { singleMovie ,Page} from "./Types/app"
import Slider from "react-slick";
import { DoubleRightOutlined } from "@ant-design/icons";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { StyledButton } from "./StyledComponents/StyledButton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import './MovieBox.css'
import React, { useCallback, useEffect, useRef ,useState} from "react";
type TMovieBox={
    movies: Page[] 
    title: string
    PopularfetchNextPage: () => void
    setMovie: (movie: singleMovie | null) => void
    setShowModal: (showModal: boolean) => void
    showModal: boolean
}
function MoviesBox({ movies, title, PopularfetchNextPage,setMovie,setShowModal,showModal }: TMovieBox) {
    const key = 'e5a319653f57fe3b2a8b69afa1a4377f';
    const [videoo, SetVideoo] = useState<number>(0)

    const fetchMovieVideo = () => {
    return axios.get(`https://api.themoviedb.org/3/movie/${videoo}/videos?api_key=${key}`);
    }
    const { data: movieVideo } = useQuery({
        queryKey: ['movieVideoo',videoo],
        queryFn: fetchMovieVideo,
        select: (data) => {
            return data.data.results[0]
        },
        enabled: videoo!==0,
        staleTime: 0,
        refetchOnWindowFocus: false
    });
    const BoxHover = useRef<any>([])
    const BoxToHover = useRef<any>([])
    function SliderButton({arrow,onClick,className}:any) {
        return <div style={{cursor:'pointer'}} className="d-flex align-items-center justify-content-center" onClick={onClick} >{arrow}</div>
    }
    const FlattenMoviesArray = movies?.flat()
    

    const settings = {
        adaptiveHeight:true,
        draggable:true,
        dots: false,
        infinite: false,
        speed: 500,
        cssEase:'linear',
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <SliderButton  arrow={<DoubleRightOutlined  className="slider-button next   d-flex align-items-center justify-content-center" style={{ color: 'white' ,fontSize:50}} />}/>,
        prevArrow: <SliderButton  arrow={<DoubleLeftOutlined className="slider-button left d-flex align-items-center justify-content-center" style={{ color: 'white',fontSize:50}} />} />
    };

    const getMovie=useCallback((movie:singleMovie | null)=>{
        setMovie(movie)
        setShowModal(true)
    },[setMovie,setShowModal])

    useEffect(() => {
        const current = BoxHover.current
        const HoverCurrent = BoxToHover.current
            if (current && HoverCurrent) {
            current.map((e: any, i: number) => {
                if (e) {
                        e.addEventListener('mouseenter', (e:React.MouseEvent<HTMLDivElement>) => {
                                e.stopPropagation()
                                HoverCurrent[i].style.width = '120%'
                                HoverCurrent[i].style.height = '390px'
                                HoverCurrent[i].style.transition = '0.3s'
                                current[i].style.transform = 'rotate(0deg)'
                            current[i].style.zIndex = '1'
                            current[i].style.transition='0.3s'
                                SetVideoo(FlattenMoviesArray[i]?.id)

                    })
                    e.addEventListener('mouseleave', (e:React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation()
                        HoverCurrent[i].style.width = '0'
                        HoverCurrent[i].style.height = '0'
                        HoverCurrent[i].style.transition = '0.3s'
                     
                        current[i].style.transform = 'rotate(10deg)'
                        current[i].style.zIndex = '0'

                    SetVideoo(0)
                    })
                }
           
                return null
            })
        }
    
    }, )
    


return (
    <div className='container-fluid  '>
        <div className='row'>
            <div className='col-12 p-0 position-relative'>
                <h2 className='col-12 my-3 MovieBoxTitle ps-5' style={{ color: 'white' ,fontFamily:'poppins'}}>{title}</h2>
                <div  className="col-12  ">
                    <Slider className="slider position-relative d-flex p-0 col-12" {...settings}>
                        {FlattenMoviesArray?.map((movie: singleMovie, i: number) => {
                        return <div className="col-12 d-flex MovieCon justify-content-center align-items-center" key={movie.id}>
                            <div ref={e => BoxHover.current[i] = e} className="col-11 ToHoverTheBox">

                                <div className=" col-12 overflow-hidden rounded z-3 imgCon h-100 ">
                                    <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid h-100 w-100" />
                                </div>

                                <div ref={e => BoxToHover.current[i] = e} className={`BoxHover z-1 rounded d-flex flex-column overflow-hidden  align-items-ceter`}>
                                    <div className = "col-12 ImgInHoverBox p-0" >
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid h-100 w-100" alt={movie.title}/>
                                    </div>
                                    <div className="col-12 p-3">
                                        <h6 className="col-12 p-0 m-0">{movie.title || movie.name}</h6>
                                    <p className="col-12 p-0 my-2">{movie.release_date || movie.first_air_date}</p>
                                        <p className="overview col-12 p-0 m-0">{movie.overview}</p>
                                        <StyledButton onClick={()=>getMovie(movie)} className="col-12 p-1 mt-3">Show Movie</StyledButton>
                                    </div>
                                </div>

                            </div>

                        </div>
                    })}
                        <div  className=" loadMore justify-content-center align-items-center d-flex" onClick={PopularfetchNextPage}>
                            <StyledButton className="col-6 p-2">Load More</StyledButton>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    </div>
)
}

export default MoviesBox
