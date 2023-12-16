import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import { useSelector } from 'react-redux'
import Home from "./components/Home";
import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies,fetchPlayingMovies,fetchPopularSeries,fetchAirSeries,fetchOnTheAirSeries,fetchTopRatedSeries } from "./components/fetches/Movies";
import { Page } from "./components/Types/app";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Loader from "./components/Loader";
type TUser = {
    token: string
    user:any
}
function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector((state: TUser) => state.user.token)

  useEffect(() => {
    if (token === '') {
      if ((location.pathname === '/signin' as string || location.pathname === '/' as string) ) {
        navigate(location.pathname)
      } else {
        navigate('/')
        
      }
    }
  }, [token])

  const { data: popularMovies,isSuccess:popularMoviesSuccess,fetchNextPage:PopularfetchNextPage } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    
    
  })

    const { data: TopRatedMovies,isSuccess:TopRatedMoviesSuccess,fetchNextPage:fetchTopRatedNextPage } = useInfiniteQuery({
    queryKey: ['TopRatedMovies'],
    queryFn: fetchTopRatedMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
      },
      staleTime: 0,
    refetchOnWindowFocus: false
    })
  
  const { data: UpcomingMovies,isSuccess:UpcomingMoviesSuccess,fetchNextPage:fetchUpcomingNextPage,isFetching:UpcomingMoviesFetching } = useInfiniteQuery({
    queryKey: ['UpcomingMovies'],
    queryFn: fetchUpcomingMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  const { data: PlyingMovies,isSuccess:PlayingMoviesSuccess,fetchNextPage:fetchPlayingNextPage ,isFetching:PlayingMoviesFetching} = useInfiniteQuery({
    queryKey: ['PlayingMovies'],
    queryFn: fetchPlayingMovies,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  const { data: PopularSeries,fetchNextPage:fetchPopularSeriesNextPage,isFetching:PopularSeriesFetching } = useInfiniteQuery({
    queryKey: ['PopularSeries'],
    queryFn: fetchPopularSeries,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  const { data: AirSeries,fetchNextPage:fetchAirSeriesNextPage,isFetching:AirSeriesFetching } = useInfiniteQuery({
    queryKey: ['AirSeries'],
    queryFn: fetchAirSeries,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  const { data: OnTheAirSeries,fetchNextPage:fetchOnTheAirSeriesNextPage,isFetching:OnTheAirSeriesFetching } = useInfiniteQuery({
    queryKey: ['OnTheAirSeries'],
    queryFn: fetchOnTheAirSeries,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  const { data: TopRatedSeries,fetchNextPage:fetchTopRatedSeriesNextPage,isFetching:TopRatedSeriesFetching } = useInfiniteQuery({
    queryKey: ['TopRatedSeries'],
    queryFn: fetchTopRatedSeries,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < lastPage.data.total_pages) {
        return pages.length + 1
      } else return undefined
    },
    initialPageParam: 1,
    select: (data) => {
      return data.pages.map((page) => page.data.results)
    },
    staleTime: 0,
    refetchOnWindowFocus: false
    

  })
  function Loading() {
    return (
      <div>
        <Loader />
      </div>
    )
  }
  useEffect(()  =>  {
    
  }, [OnTheAirSeriesFetching, TopRatedSeriesFetching, AirSeriesFetching, PopularSeriesFetching, PlayingMoviesFetching, UpcomingMoviesFetching])
  

if (OnTheAirSeriesFetching||TopRatedSeriesFetching||AirSeriesFetching||PopularSeriesFetching||PlayingMoviesFetching||UpcomingMoviesFetching) {

  return (
    <div>
      <Loading />
    </div>
  )
    } 
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        {token !== '' && <Route path="/home" element={<Home popularMoviesSuccess={popularMoviesSuccess} PopularfetchNextPage={PopularfetchNextPage} popularMovies={popularMovies as Page[]} TopRatedMovies={TopRatedMovies as Page[]} TopRatedMoviesSuccess={TopRatedMoviesSuccess} fetchTopRatedNextPage={fetchTopRatedNextPage} UpcomingMovies={UpcomingMovies as Page[]} UpcomingMoviesSuccess={UpcomingMoviesSuccess} fetchUpcomingNextPage={fetchUpcomingNextPage} playingMovies={PlyingMovies as Page[]} playingMoviesSuccess={PlayingMoviesSuccess} fetchPlayingNextPage={fetchPlayingNextPage} popularSeries={PopularSeries as Page[]} fetchPopularSeries={fetchPopularSeriesNextPage} AirSeries={AirSeries as Page[] } fetchAirSeries={fetchAirSeriesNextPage} OnTheAirSeries={OnTheAirSeries as Page[]} fetchOnTheAirSeries={fetchOnTheAirSeriesNextPage} TopRatedSeries={TopRatedSeries as Page[]} fetchTopRatedSeries={fetchTopRatedSeriesNextPage} /> } />}
      </Routes>
      <ReactQueryDevtools position='bottom' initialIsOpen={false} />
    </div>
  );
}

export default App;
