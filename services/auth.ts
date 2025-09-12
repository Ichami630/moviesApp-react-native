import { API_CONFIG } from "./config";

export const Signup = async (user: User) => {
    try {
        const res = await fetch(`${API_CONFIG.BASE_URL}/register`,{
            method: "POST",
            body: JSON.stringify(user),
            headers: API_CONFIG.headers
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}