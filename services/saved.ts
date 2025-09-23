import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export const savedMovies = async () => {
    try {
        const savedMovies = JSON.parse((await AsyncStorage.getItem("saved")) || "[]")
        return savedMovies
    } catch (error) {
        console.log("Failed to fetch saved movies",error)
        throw error;
    }
}

export const saveLoginUserInfo = async (user: User) => {
    await SecureStore.setItemAsync("user",JSON.stringify(user))
}

export const getUserInfo = async (): Promise<User | null> => {
    const user = await SecureStore.getItemAsync("user");
    return user ? JSON.parse(user): null
}

export const clearUserInfo = async () => {
    await SecureStore.deleteItemAsync("user")
}