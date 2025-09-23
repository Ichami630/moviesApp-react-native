
import { API_CONFIG, getAuthHeaders } from "./config";


export const createTrendingMovies = async (movie: TrendingMovie) => {
    try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${API_CONFIG.BASE_URL}/trendingmovies`,{
            method: 'POST',
            body: JSON.stringify(movie),
            headers,
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getTrendingMovies = async () => {
    try {
        const headers = await getAuthHeaders()
        const res = await fetch(`${API_CONFIG.BASE_URL}/trendingmovies`,{
            method: "GET",
            headers
        });
        const data = await res.json();
        return data.trendingMovies;
    } catch (error) {
        console.log(error)
    }
}