import axios from "axios";

const key = 'e5a319653f57fe3b2a8b69afa1a4377f';

export const fetchPlayingMovies = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/movie/now_playing?page=${pageParam}&api_key=${key}`);
}
export const fetchPopularMovies = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/movie/popular?page=${pageParam}&api_key=${key}`);
}
export const fetchTopRatedMovies = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/movie/top_rated?page=${pageParam}&api_key=${key}`);
}

export const fetchUpcomingMovies = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/movie/upcoming?page=${pageParam}&api_key=${key}`);
}
export const fetchPopularSeries = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/tv/popular?page=${pageParam}&api_key=${key}`);
}
export const fetchAirSeries = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/tv/on_the_air?page=${pageParam}&api_key=${key}`);
}
export const fetchOnTheAirSeries = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/tv/airing_today?page=${pageParam}&api_key=${key}`);
}

export const fetchTopRatedSeries = ({ pageParam = 1 }) => {
    return axios.get(`https://api.themoviedb.org/3/tv/top_rated?page=${pageParam}&api_key=${key}`);
}
