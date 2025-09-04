import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React, { memo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const SavedCard = ({id,poster_path,title,release_date,vote_average}: SavedMoviesProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[100px]'>
                <Image source={{
                    uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`:'https://placehold.co/600x400/1a1a1a/ffffff.png'
                }} 
                className='w-full rounded-lg h-52'
                resizeMode='cover'
                />
                <Text className='font-bold text-accent text-whte' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-start gap-x-1'>
                    <Image source={icons.star} className='size-4' />
                    <Text className='text-xs font-bold text-white uppercase'>{Math.round(vote_average/2)}</Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='mt-1 text-xs font-medium text-light-300'>{release_date?.split("-")[0]}</Text>
                    {/* <Text className='text-xs font-medium uppercase text-light-300'>Movies</Text> */}
                </View>
            </TouchableOpacity>
        </Link>
  )
}

export default memo(SavedCard)