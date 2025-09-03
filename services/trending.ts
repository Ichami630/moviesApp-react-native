import { API_CONFIG } from "./config";

export const createTrendingMovies = async (movie: TrendingMovie) => {
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
        const res = await fetch(`${API_CONFIG.BASE_URL}/trendingmovies`,{
            method: "GET",
            headers: API_CONFIG.headers,
        });
        const data = await res.json();
        return data.trendingMovies;
    } catch (error) {
        console.log(error)
    }
}