export const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIES_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIES_API_KEY}`
    }
}

export const API_CONFIG = {
    BASE_URL: 'http://192.168.43.195:8085',
    headers: {
        accept: 'application/json',
    }
}

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

export const createTrendingMovies = async (movie: Movie) => {
    try {
        const res = await fetch(`${API_CONFIG.BASE_URL}/trendingmovies`,{
            method: 'POST',
            body: JSON.stringify(movie),
            headers: API_CONFIG.headers
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getTrendingMovies = async () => {
    try {
        const res = await fetch(`${API_CONFIG.BASE_URL}/gettrendingmovies`,{
            method: "GET",
            headers: API_CONFIG.headers,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}