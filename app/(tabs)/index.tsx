import SearchBar from "@/components/inputs/SearchBar";
import LatestMovies from "@/components/LatestMovies";
import TrendingCarousel from "@/components/TrendingCarousel";
import TrendingMovies from "@/components/TrendingMovies";
import { useRouter } from "expo-router";
import { FlatList, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <FlatList
        data={[]} // no data, just using FlatList for scroll
        renderItem={null}
        ListHeaderComponent={
          <>
          <View className="mt-4 mb-5">
            <TrendingCarousel />
          </View>
          <View className="px-4">
            <SearchBar
              placeholder="Search for movies"
              autoFocus={false}
              onPress={() => router.push("/search")}
            />
            {/* Trending movies */}
            <TrendingMovies />
            {/* Latest movies */}
            <LatestMovies />
          </View>
          </>
        }
      />
    </View>
  );
}
