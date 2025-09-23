import { SignIn } from "@/services/auth";
import { isTokenExpired, refreshAccessToken } from "@/services/authServices";
import { clearUserInfo, getUserInfo } from "@/services/saved";
import { clearTokens, getAccessToken, getRefreshToken, saveToken } from "@/services/tokenStorage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext<AuthContext | undefined>(undefined)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setrefreshToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    useEffect(()=>{
        const load = async () => {
            const aToken = await getAccessToken();
            const rToken = await getRefreshToken();
            const userInfo = await getUserInfo()

            let validAccessToken = aToken;
            //check if access token is expired
            if(isTokenExpired(aToken)){
                console.log("Access token expired, refreshing..");
                const newToken = await refreshAccessToken(); //get new access and refresh token, and return the access token
                if(!newToken){
                    //unable to get a new access token, log the user out
                    await clearTokens(); //clear the access and refresh tokens
                    await clearUserInfo(); //clear the user info
                    setAccessToken(null)
                    setrefreshToken(null)
                    setUser(null)
                    setTimeout(()=>{
                        router.replace("/(auth)"); //redirect user to login page
                    },500)
                    return;
                }
                validAccessToken = newToken;
            }
            //access token is valid
            setAccessToken(validAccessToken)
            setrefreshToken(rToken)
            setUser(userInfo)
            setLoading(false);
        }
        load();
    },[router])

    const login = async (email: string, password: string) => {
        try {
            const res = await SignIn({email,password})
            if(res?.success){
                await saveToken(res?.accessToken,res?.refreshToken)
                setAccessToken(res?.accessToken)
                setrefreshToken(res?.refreshToken)
                setUser(res?.user)
                return true;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const logout = async () => {
        await clearTokens(); //clear the access and refresh tokens
        await clearUserInfo(); //cleat the user info
        setAccessToken(null)
        setrefreshToken(null)
        setUser(null)
        router.replace("/(auth)/login"); //redirect user to login page
    }

    return (
        <AuthContext.Provider value={{user,accessToken,refreshToken,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}