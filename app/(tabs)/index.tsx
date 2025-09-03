import SearchBar from "@/components/inputs/SearchBar";
import LatestMovies from "@/components/LatestMovies";
import TrendingMovies from "@/components/TrendingMovies";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import { FlatList, Image, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <FlatList
        data={[]} // no data, just using FlatList for scroll
        renderItem={null}
        ListHeaderComponent={
          <View className="px-4">
            {/* Logo */}
            <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
            {/* Search bar */}
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
        }
      />
    </View>
  );
}
