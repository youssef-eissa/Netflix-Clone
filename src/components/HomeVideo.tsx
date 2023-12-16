import { Page } from "./Types/app"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import ReactPlayer from "react-player"
import './HomeVideo.css'
import { useEffect, useState } from "react"


type THomeVideo = {
    popularMovies: Page[]
    popularMoviesSuccess: boolean
}
function HomeVideo({ popularMovies, popularMoviesSuccess }: THomeVideo) {
const key = 'e5a319653f57fe3b2a8b69afa1a4377f';
const [video,SetVideo]=useState<number>(0)
useEffect(() => {
    if (popularMoviesSuccess) {
        const randomNumber = Math.floor(Math.random() * popularMovies[0].length)
    if (popularMoviesSuccess) {
        SetVideo(popularMovies[0][randomNumber]?.id)
    }
}
    }, [popularMoviesSuccess,popularMovies])

const fetchMovieVideo = () => {
    return axios.get(`https://api.themoviedb.org/3/movie/${video}/videos?api_key=${key}`);
}
const { data: movieVideo } = useQuery({
    queryKey: ['movieVideo'],
    queryFn: fetchMovieVideo,
    select: (data) => {
        return data.data.results[0]
    },
    enabled: !!video,
    staleTime: 0,
    refetchOnWindowFocus: false
    
});


    return (
        <div className="container-fluid ">
            <div className="row">
                <div className="col-12 video p-0">
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
                    
                </div>
            </div>
    </div>
)
}

export default HomeVideo