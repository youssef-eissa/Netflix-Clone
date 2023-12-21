import { singleMovie ,Page} from "./Types/app"
import Slider from "react-slick";
import { DoubleRightOutlined } from "@ant-design/icons";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { StyledButton } from "./StyledComponents/StyledButton";
import './MovieBox.css'
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux'
import { setTheMovie } from './redux/Movie'
type TMovieBox = {
    movies: Page[]
    title: string
    fetchNextPage?: () => void
    setShowModal: (showModal: boolean) => void
    showModal: boolean
    series?:Page[]
}
function MoviesBox({ movies, title, fetchNextPage,setShowModal,series }: TMovieBox) {
    const dispatch=useDispatch()
    const BoxHover: React.MutableRefObject<HTMLDivElement[]> = useRef([])
    const BoxToHover = useRef<any>([])
    function SliderButton({arrow,onClick}:any) {
        return <div style={{cursor:'pointer'}} className="d-flex align-items-center justify-content-center" onClick={onClick} >{arrow}</div>
    }
    const FlattenMoviesArray = movies?.flat()|| series?.flat()
    

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
        prevArrow: <SliderButton arrow={<DoubleLeftOutlined className="slider-button left d-flex align-items-center justify-content-center" style={{ color: 'white', fontSize: 50 }} />} />,
        responsive: [
            
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const getMovie=useCallback((movie:singleMovie | null)=>{
        
        setShowModal(true)
        dispatch(setTheMovie(movie))
        
    }, [ setShowModal, dispatch])

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

                    })
                    e.addEventListener('mouseleave', (e:React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation()
                        HoverCurrent[i].style.width = '0'
                        HoverCurrent[i].style.height = '0'
                        HoverCurrent[i].style.transition = '0.3s'
                     
                        current[i].style.transform = 'rotate(10deg)'
                        current[i].style.zIndex = '0'

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
                            <div ref={e  => BoxHover.current[i]  = e!} className="col-11 ToHoverTheBox">

                                <div className=" col-12 overflow-hidden rounded z-3 imgCon h-100 ">
                                    <img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid h-100 w-100" />
                                </div>

                                <div ref={e => BoxToHover.current[i] = e} className={`BoxHover z-1 rounded d-flex flex-column overflow-hidden  align-items-center`}>
                                    <div className = "col-12 ImgInHoverBox p-0" >
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="img-fluid h-100 w-100" alt={movie.title}/>
                                    </div>
                                    <div className="col-12 p-3">
                                        <h6 className="col-12 p-0 m-0">{movie.title || movie.name}</h6>
                                    <p className="col-12 p-0 my-2">{movie.release_date || movie.first_air_date}</p>
                                        <p className="overview col-12 p-0 m-0">{movie.overview}</p>
                                        <StyledButton onClick={()=>getMovie(movie)} className="col-12 p-1 mt-3">Show Info</StyledButton>
                                    </div>
                                </div>

                            </div>

                        </div>
                    })}
                        <div  className=" loadMore justify-content-center align-items-center d-flex" onClick={fetchNextPage}>
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
