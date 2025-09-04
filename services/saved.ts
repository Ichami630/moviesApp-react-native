import AsyncStorage from "@react-native-async-storage/async-storage";

export const savedMovies = async () => {
    try {
        const savedMovies = JSON.parse((await AsyncStorage.getItem("saved")) || "[]")
        return savedMovies
    } catch (error) {
        console.log("Failed to fetch saved movies",error)
        throw error;
    }
}