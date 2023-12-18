import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Signin from "./components/Signin";
import { useSelector } from 'react-redux'
import Home from "./components/Home";
import { useNavigate,useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies,fetchPlayingMovies,fetchPopularSeries,fetchAirSeries,fetchOnTheAirSeries,fetchTopRatedSeries } from "./components/fetches/Movies";
import { Page, singleMovie } from "./components/Types/app";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Loader from "./components/Loader";
import NavBar from "./components/NavBar";
import MoviesPage from "./components/MoviesPage";
import HomeFooter from "./components/HomeFooter";
type TUser = {
    token: string
    user:any
}
function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = useSelector((state: TUser) => state.user.token)
  const [Movie, setMovie] = useState<singleMovie | null>(null)
  const [showModal, setShowModal] = useState<boolean>(false)

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
    refetchOnWindowFocus: false,
    enabled: token !== ''
    
    
  })

    const { data: TopRatedMovies,fetchNextPage:fetchTopRatedNextPage } = useInfiniteQuery({
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
      refetchOnWindowFocus: false,
    enabled: token !== ''
    
    })
  
  const { data: UpcomingMovies,fetchNextPage:fetchUpcomingNextPage,isFetching:UpcomingMoviesFetching } = useInfiniteQuery({
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
    refetchOnWindowFocus: false,
    enabled: token !== ''

    

  })
  const { data: PlyingMovies,fetchNextPage:fetchPlayingNextPage ,isFetching:PlayingMoviesFetching} = useInfiniteQuery({
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
    refetchOnWindowFocus: false,
    enabled: token !== ''

    

  })
  const { data: PopularSeries,fetchNextPage:fetchPopularSeriesNextPage,isFetching:PopularSeriesFetching,isSuccess:PopularSeriesSuccess } = useInfiniteQuery({
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
    refetchOnWindowFocus: false,
    enabled: token !== ''

    

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
    refetchOnWindowFocus: false,
    enabled: token !== ''
    

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
    refetchOnWindowFocus: false,
    enabled: token !== ''

    

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
    refetchOnWindowFocus: false,
    enabled: token !== ''

    

  })
  function Loading() {
    return (
      <div>
        <Loader />
      </div>
    )
  }
  
  

if (OnTheAirSeriesFetching||TopRatedSeriesFetching||AirSeriesFetching||PopularSeriesFetching||PlayingMoviesFetching||UpcomingMoviesFetching) {

  return (
    <div>
      <Loading />
    </div>
  )
    }
  return (
    <div>
      {token!=='' && <NavBar/>}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        {token !== '' && <>
          <Route path="/home" element={<Home
            LargeVideo={popularMovies as Page[]}
            Movie={Movie}
            setMovie={setMovie}
            showModal={showModal}
            setShowModal={setShowModal}
            popularMoviesSuccess={popularMoviesSuccess}
            PopularfetchNextPage={PopularfetchNextPage}
            popularMovies={popularMovies as Page[]}
            TopRatedMovies={TopRatedMovies as Page[]}
            fetchTopRatedNextPage={fetchTopRatedNextPage}
            UpcomingMovies={UpcomingMovies as Page[]}
            fetchUpcomingNextPage={fetchUpcomingNextPage}
            playingMovies={PlyingMovies as Page[]}
            fetchPlayingNextPage={fetchPlayingNextPage}
            popularSeries={PopularSeries as Page[]}
            fetchPopularSeries={fetchPopularSeriesNextPage}
            AirSeries={AirSeries as Page[]}
            fetchAirSeries={fetchAirSeriesNextPage}
            OnTheAirSeries={OnTheAirSeries as Page[]}
            fetchOnTheAirSeries={fetchOnTheAirSeriesNextPage}
            TopRatedSeries={TopRatedSeries as Page[]}
            fetchTopRatedSeries={fetchTopRatedSeriesNextPage}
          />}
          />
            
          <Route path="/films" element={<MoviesPage
            popularMovies={popularMovies as Page[]}
            Movie={Movie}
            setMovie={setMovie}
            showModal={showModal}
            setShowModal={setShowModal}
            PopularfetchNextPage={PopularfetchNextPage}
            Success={popularMoviesSuccess}
            TopRatedMovies={TopRatedMovies as Page[]}
            LargeVideo={UpcomingMovies as Page[]}
            fetchTopRatedNextPage={fetchTopRatedNextPage}
            UpcomingMovies={UpcomingMovies as Page[]}
            fetchUpcomingNextPage={fetchUpcomingNextPage}
            playingMovies={PlyingMovies as Page[]}
            fetchPlayingNextPage={fetchPlayingNextPage}
          />} />

            <Route path="/series" element={<MoviesPage
            LargeVideo={AirSeries as Page[]}
            Success={PopularSeriesSuccess}

            popularSeries={PopularSeries as Page[]}
            AirSeries={AirSeries as Page[]}
            OnTheAirSeries={OnTheAirSeries as Page[]}
            TopRatedSeries={TopRatedSeries as Page[]}
            Movie={Movie}
            setMovie={setMovie}
            showModal={showModal}
            setShowModal={setShowModal}
            

          />} />
        </>
        
        }
      </Routes>

      {token !== '' && <HomeFooter />}
      <ReactQueryDevtools position='bottom' initialIsOpen={false} />
    </div>
  );
}

export default App;
