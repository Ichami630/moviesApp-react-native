import { TMDB_CONFIG } from "./config";

export const fetchMovies = async ({query}: {query: string}) => {
    const endpoint = query ? `/search/movie?query=${encodeURIComponent(query)}`: '/discover/movie?sort_by=popularity.desc'
    try {
        const res = await fetch(`${TMDB_CONFIG.BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers
        });
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.log('Error fetching movies', error);
    }
}