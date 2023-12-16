export type singleMovie = {
        adults: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        origin_country?: string[]
        name?: string;
        original_name?: string;
        first_air_date?: string;

}
export type singleSeries = {
        name: string;
        origin_country: string;
        original_name: string;
        id: number;
        overview: string;
        vote_average: number;
        vote_count: number;
        poster_path: string;
        first_air_date: string;
        original_language: string;
}
export type Page = {
        adults: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_name?: string;
        first_air_date?: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
        name?: string;
        profile_path?: string;
        origin_country?: string[]
}[]

export type genre = {
        id: number;
        name: string;
}