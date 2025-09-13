import { jwtDecode } from "jwt-decode";
import { getRefreshToken, saveToken } from "./tokenStorage";

export const refreshAccessToken = async (): Promise<string | null> => {
    try {
        const refreshToken = await getRefreshToken();
        if(!refreshToken) throw new Error("No refresh Token");
        const res = await fetch(`http://192.168.43.195:8085/refresh`,{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({refreshToken})
        })

        if(!res.ok) throw new Error("Request failed");
        const data = await res.json();
        //save new token
        await saveToken(data.accessToken, data.refreshToken)
        return data.accessToken;
    } catch (error) {
        console.log("refresh token error:",error);
        return null;
    }
}
type JwtPayload = {
    exp: number;
}
export const isTokenExpired = (token: string | null): boolean => {
    if(!token) return true;
    try {
        const {exp} = jwtDecode<JwtPayload>(token);
        if(!exp) return true;
        return Date.now() >= exp * 1000;
    } catch (err) {
        console.log(err)
        return true; //treat invalid token as expired
    }
}