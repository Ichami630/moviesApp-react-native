import { icons } from '@/constants/icons';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface MovieProps {
    movie: MovieDetails;
}

const SaveMovies = ({movie}: MovieProps) => {
    const [saved, setSaved] = useState(false); 

    useEffect(()=>{
        //check if the movies was already saved to fav
        
    },[movie])
    const handleToggleSave = () => {
        console.log("movie saved")
    }
  return (
    <TouchableOpacity
        className='absolute p-2 bg-white rounded-full top-5 right-5'
        onPress={handleToggleSave}
    >
        <Image 
            source={icons.save}
            className='w-6 h-6'
            resizeMode='contain'
        />
    </TouchableOpacity>
  )
}

export default SaveMovies