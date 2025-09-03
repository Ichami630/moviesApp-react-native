import MoviesCard from '@/components/MoviesCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { createTrendingMovies, fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }
  ),false)

  useEffect(()=> {
    const timeoutId =setTimeout(async () => {
      if(searchQuery.trim()){
        await loadMovies();
      }else{ reset()}
    },500)
    return () => clearTimeout(timeoutId)
  },[searchQuery])

  //track last save movie to avoid duplicate movie save
  const [lastSavedId, setLastSavedId] = useState<string | null>(null)

  //save the first returned result of the search to the trending movie
  useEffect( ()=>{
    if(movies && movies.length > 0){
      const firstMovies = movies[0];

      //only save if its a new search result
      if(firstMovies.id.toString() !== lastSavedId){
        createTrendingMovies({
          search_term: searchQuery,
          movie_id: firstMovies.id.toString(),
          title: firstMovies.title,
          count: 1, //backend will increment if it already exist
          poster_url: firstMovies.poster_path
        });
        setLastSavedId(firstMovies.id.toString())
      }

    }
  },[movies,lastSavedId])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute z-0 flex-1 w-full' resizeMode='cover' />
      <FlatList 
      data={movies} 
      renderItem={({item}) => <MoviesCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "flex-start",
        gap: 16,
        marginVertical: 16 
      }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
          <View className='flex-row justify-center w-full mt-20'>
            <Image source={icons.logo} className='w-12 h-10' />
          </View>
          <View className='my-5'>
            <SearchBar 
            placeholder='Search movies...'
            value={searchQuery}
            onChangeText= {(text:string)=> setSearchQuery(text)} 
            />
          </View> 
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" className='my-3' />
          )}
          {error && (
            <Text>
              Error: {error.message}
            </Text>
          )}
          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className='text-xl text-white font-white'>
              Search Results for{' '}
              <Text className='text-accent'>{searchQuery}</Text>
            </Text>
          )}

        </>
      }
      ListEmptyComponent={
        !loading && !error ? (
          <View className='px-5 ml-10'>
            <Text className='text-center text-gray-500'>
              {searchQuery.trim() ? 'No movies found': 'Search for a movies'}
            </Text>
          </View>
        ):null
      }
      ></FlatList>
    </View>
  ) 
}

export default Search