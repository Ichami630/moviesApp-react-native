export const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIES_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIES_API_KEY}`
    }
};

export const API_CONFIG = {
    BASE_URL: 'http://192.168.43.195:8085',
    headers: { accept: 'application/json' }
};
