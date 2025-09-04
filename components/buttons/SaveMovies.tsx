import { icons } from '@/constants/icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MovieProps {
    movie: MovieDetails;
}

const SaveMovies = ({ movie }: MovieProps) => {
    const [saved, setSaved] = useState(false); 
    const [message, setMessage] = useState('');

    useEffect(() => {
        const checkSaved = async () => {
            const savedMovies = JSON.parse((await AsyncStorage.getItem("saved")) || "[]");
            setSaved(savedMovies.some((m: any) => m.id === movie.id));
        };
        if (movie) checkSaved();
    }, [movie]);

    const handleToggleSave = async () => {
        try {
            const savedMovies = JSON.parse((await AsyncStorage.getItem("saved")) || "[]");
            let updated;

            if(saved){
                // remove movie
                updated = savedMovies.filter((m: any) => m.id !== movie.id);
                setMessage('Removed from saved movies');
            } else {
                // add movie
                updated = [...savedMovies, movie];
                setMessage('Movie saved successfully!');
            }

            await AsyncStorage.setItem("saved", JSON.stringify(updated));
            setSaved(!saved);

            // Hide message after 5 seconds
            setTimeout(() => setMessage(''), 5000);
        } catch (error) {
            console.log("Error updating saved movies", error);
            setMessage('Error saving movie');
            setTimeout(() => setMessage(''), 5000);
        }
    };

    return (
        <>
            <TouchableOpacity
                className='absolute p-2 bg-white rounded-full top-5 right-5'
                onPress={handleToggleSave}
            >
                <Image 
                    source={icons.save}
                    className='w-6 h-6'
                    resizeMode='contain'
                    tintColor={saved ? "red": "#000"}
                />
            </TouchableOpacity>

            {/* Success / Info message */}
            {message ? (
                <View className='absolute px-4 py-2 -translate-x-1/2 rounded-md bg-dark-100 top-20 left-1/2'>
                    <Text className='text-sm text-white'>{message}</Text>
                </View>
            ) : null}
        </>
    );
};

export default SaveMovies;
