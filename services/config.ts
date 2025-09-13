
import { isTokenExpired, refreshAccessToken } from "./authServices";
import { getAccessToken } from "./tokenStorage";

export const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIES_API_KEY,
    BASE_URL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIES_API_KEY}`
    }
};

//get the access token from securestore
export const getAuthHeaders = async (logoutcallback?: ()=>void) => {
    let token = await getAccessToken();
    if(token && isTokenExpired(token)){
        console.log("Token expired, refreshing...");
        token = await refreshAccessToken();
    }
    if(!token && logoutcallback){
        logoutcallback();
    }
    return {
      accept: 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  };
export const API_CONFIG = {
    BASE_URL: 'http://192.168.43.195:8085',
};
