export const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIES_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIES_API_KEY}`
    }
}

export const fetchMovies = async ({query}: {query: string}) => {
    const endpoint = query ? `/search/movies?query=${encodeURIComponent(query)}`: '/discover/movie?sort_by=popularity.desc'
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