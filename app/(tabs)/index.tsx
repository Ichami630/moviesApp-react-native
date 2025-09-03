import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, getTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
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
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
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
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="my-5" />
        ) : moviesError ? (
          <Text className="text-red-500">
            Error loading movies: {moviesError.message}
          </Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => <MoviesCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              paddingRight: 5,
              marginBottom: 10,
            }}
            className="pb-32 mt-2"
            scrollEnabled={false}
            ListEmptyComponent={
              !moviesLoading && !moviesError ? (
                <Text className="text-center text-light-300">** No Movies Available **</Text>
              ):null
            }
          />
        )}
      </ScrollView>
    </View>
  );
}
