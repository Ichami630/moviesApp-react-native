import useFetch from '@/hooks/useFetch';
import { fetchMovies } from '@/services/tmdb';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import MoviesCard from './cards/MoviesCard';

const columnWrapper = {
    justifyContent: "flex-start" as "flex-start",
    paddingRight: 5,
    gap: 10,
    marginBottom: 10,
  };

const LatestMovies = () => {
  // Fetch latest movies (TMDB)
  const {
    data: latestData,
    loading: latestLoading,
    error: latestError,
  } = useFetch(() => fetchMovies({query: ""})); 
  // Memoized render function for FlatList items.
  // Ensures the function reference stays stable between re-renders,
  // so React.memo(moviecard) can prevent unnecessary re-renders.
  const renderMovieItem = useCallback(
    ({item}: {item: Movie}) => ( 
    <MoviesCard {...item} />),[]
  )
  return (
    <View className='my-5'>
        <Text className="text-lg font-bold text-white">
            Latest Movies
        </Text>
        {latestLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="my-5" />
        ):latestError ? (
            <Text className="text-red-500">
                Error loading trending movies: {latestError.message}
            </Text>
        ):(
            <FlatList
                data={latestData}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                initialNumToRender={12} //only render 12 item at start
                getItemLayout={(data,index) => (
                    {
                        length: 120, //height of each row
                        offset: 120 * index,
                        index
                    }
                )}
                className="pb-32 mt-2"
                ListEmptyComponent={
                    !latestLoading && !latestError ? (
                      <Text className="text-center text-light-300">** No Movies Found **</Text>
                    ): null
                }
                columnWrapperStyle={columnWrapper}
            >

            </FlatList>
        ) }
    </View>
  )
}

export default LatestMovies

