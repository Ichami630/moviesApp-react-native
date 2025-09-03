import { Link } from 'expo-router'
import React, { memo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingCard = ({movie,index}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie.movie_id}`} asChild>
        <TouchableOpacity className='w-[100px] mr-4'>
            <Image
            source={{
                uri: movie.poster_url ?  `https://image.tmdb.org/t/p/w500${movie.poster_url}`:'https://placehold.co/600x400/1a1a1a/ffffff.png'
            }}
            className='w-full rounded-lg h-52'
            resizeMode='cover'
            />
            <Text className='font-bold text-accent ' numberOfLines={1}>
                {movie.title}
            </Text>
            {/* Rank badge (index + 1) */}
          <View className="absolute px-2 py-1 rounded-full bottom-14 left-1">
            <Text className="text-[48px] font-extrabold text-white">
              {index + 1}
            </Text>
          </View>
        </TouchableOpacity>
    </Link>
  )
}
//ensures trendingcard only re-renders if props change
export default memo(TrendingCard)