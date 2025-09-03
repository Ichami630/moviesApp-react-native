import useFetch from '@/hooks/useFetch';
import { getTrendingMovies } from '@/services/trending';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import TrendingCard from './cards/TrendingCard';

const TrendingMovies = () => {
  // Fetch trending movies (DB)
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies()); 
  // Memoized render function for FlatList items.
  // Ensures the function reference stays stable between re-renders,
  // so React.memo(moviecard) can prevent unnecessary re-renders.
  const renderTrendingItem = useCallback(
    ({item,index}: {item: TrendingCardProps['movie']; index: TrendingCardProps['index']}) => ( 
    <TrendingCard movie={item} index={index} />),[]
  )
  return (
    <View className='my-5'>
        <Text className="mb-3 text-xl font-bold text-white">
            Trending Movies
        </Text>
        {trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="my-5" />
        ):trendingError ? (
            <Text className="text-red-500">
                Error loading trending movies: {trendingError.message}
            </Text>
        ):(
            <FlatList
                data={trendingData}
                renderItem={renderTrendingItem}
                keyExtractor={(item) => item.movie_id.toString()}
                horizontal
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    !trendingLoading && !trendingError ? (
                      <Text className="text-center text-light-300">** No Trending Movies Yet **</Text>
                    ): null
                }
            >

            </FlatList>
        ) }
    </View>
  )
}

export default TrendingMovies