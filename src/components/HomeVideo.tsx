import { Page,singleMovie } from "./Types/app"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ReactPlayer from "react-player"
import './HomeVideo.css'
import { useEffect, useState } from "react"
import { VideoMovieDiv } from "./StyledComponents/LargeMovieDiv"


type THomeVideo = {
    Movies: Page[]
    Success: boolean
}
function HomeVideo({ Movies, Success }: THomeVideo) {
const key = 'e5a319653f57fe3b2a8b69afa1a4377f';
const [video,SetVideo]=useState<number>(0)
const [SeriesOrMovie,setSeriesOrMovie]=useState<string>('')
useEffect(() => {
    if (Success) {
        const randomNumber = Math.floor(Math.random() * Movies[0].length)
    if (Success) {
        SetVideo(Movies[0][randomNumber]?.id)
    }
}
}, [Success, Movies])
    
    useEffect(() => {
        if (Movies && Movies[0][0].original_title) {
            console.log('yes');
            setSeriesOrMovie('movie')
            
        } else if(Movies && Movies[0][0].original_name!==undefined){
            setSeriesOrMovie('tv')
            console.log('no');

        }
    }, [Movies])
    

const fetchMovieVideo = () => {
    return axios.get(`https://api.themoviedb.org/3/${SeriesOrMovie}/${video}/videos?api_key=${key}`);
}
const { data: movieVideo } = useQuery({
    queryKey: ['movieVideo'],
    queryFn: fetchMovieVideo,
    select: (data) => {
        return data.data.results[0]
    },
    enabled: !!video && SeriesOrMovie!=='',
    staleTime: 0,
    refetchOnWindowFocus: false
    
});


    return (
        <div className="container-fluid ">
            <div className="row">
                    <VideoMovieDiv className="col-12 p-0">
                        <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${movieVideo?.key}`}
                        width="100%"
                        height="100%"
                        playing={true}
                        muted
                        loop
                        config={{
                            youtube: {
                                playerVars: {
                                    modestbranding: 1,
                                    showinfo: 0,
                                    rel: 0,
                                    controls: 0,
                                },
                            },
                        }}
                    />
                    </VideoMovieDiv>
            </div>
    </div>
)
}

export default HomeVideo