import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from '@/hooks/useFetch';
import { fetchMovies } from "@/services/tmdb";
import { getTrendingMovies } from "@/services/trending";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View
} from "react-native";

export default function Index() {
  const router = useRouter();

  // Fetch latest movies (TMDB)
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  // Fetch trending movies (DB)
  const {
    data: trendingData,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(() => getTrendingMovies());

  // Memoized render function for FlatList items.
  // Ensures the function reference stays stable between re-renders,
  // so React.memo(TrendingCard),React.memo(moviecard) can prevent unnecessary re-renders.
  const renderMovieItem = useCallback(
    ({ item }: {item: Movie}) => <MoviesCard {...item} />,
    []
  );
  const renderTrendingItem = useCallback(
    ({ item, index }: { item: TrendingCardProps["movie"]; index: TrendingCardProps["index"] }) => (
      <TrendingCard movie={item} index={index} />
    ),
    []
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="my-5" />
        ) : moviesError ? (
          <Text className="text-red-500">
            Error loading movies: {moviesError.message}
          </Text>
        ) : (
          <FlatList
            data={movies}
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
            columnWrapperStyle={columnWrapper}
            className="pb-32 mt-2"
            contentContainerStyle={{ 
              paddingHorizontal: 16, 
              paddingTop: 20,     
              paddingBottom: 20      
            }}
            ListHeaderComponent={
              <>
                {/* Logo */}
                <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
                {/* Search bar */}
                <SearchBar
                  placeholder="Search for movies"
                  onPress={() => router.push("/search")}
                />
                {/* Trending movies */}
                <Text className="mt-8 mb-3 text-xl font-bold text-white">
                  Trending Movies
                </Text>
                {trendingLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" className="my-5" />
                ) : trendingError ? (
                  <Text className="text-red-500">
                    Error loading trending movies: {trendingError.message}
                  </Text>
                ) : (
                  <FlatList
                    data={trendingData}
                    renderItem={renderTrendingItem}
                    keyExtractor={(item) => item.movie_id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={
                      !trendingLoading && !trendingError ? (
                        <Text className="text-center text-light-300">** No Trending Movies Yet **</Text>
                      ): null
                    }
                  />
                )}
                {/* Latest movies */}
                <Text className="mt-8 mb-3 text-sm font-bold text-white">
                  Latest Movies
                </Text>
              </>
            }
            ListEmptyComponent={
              !moviesLoading && !moviesError ? (
                <Text className="text-center text-light-300">** No Movies Available **</Text>
              ):null
            }
          />
        )}
    </View>
  );
}

const columnWrapper = {
  justifyContent: "flex-start" as "flex-start",
  paddingRight: 5,
  gap: 20,
  marginBottom: 10,
};
