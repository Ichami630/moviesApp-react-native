import SavedCard from '@/components/cards/SavedCard';
import useFetch from '@/hooks/useFetch';
import { savedMovies } from '@/services/saved';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const Saved = () => {
  const fetchSaved = async () => savedMovies();

  const { data: movies, loading, error, refetch } = useFetch(fetchSaved);

  // Refetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch(); // call your useFetch refetch function
    }, [])
  );

  const renderMovieItem = useCallback(
    ({ item }: { item: MovieDetails }) => (
      <SavedCard
        id={item.id}
        poster_path={item.poster_path}
        title={item.title}
        release_date={item.release_date}
        vote_average={item.vote_average}
      />
    ),
    []
  );

  return (
    <View className="flex-1 px-4 py-10 bg-primary">
      <Text className="mb-4 text-xl font-bold text-white">Saved Movies</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text className="text-red-500">{error.message}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'flex-start', gap: 10, marginBottom: 10 }}
          ListEmptyComponent={
            <Text className="mt-10 text-center text-light-300">** No Movies Found **</Text>
          }
        />
      )}
    </View>
  );
};

export default Saved;
