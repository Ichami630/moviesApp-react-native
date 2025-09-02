import MoviesCard from "@/components/MoviesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const {data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({
    query: ""
  }
  ))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:10}}>
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="self-center mt-10" />
        ): moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ):(
          <View className="flex-1 mt-5">
            {/* search bar */}
            <SearchBar placeholder="Search for movies" onPress={() => router.push("/search")} />
            <>
              <Text className="mt-5 mb-3 text-lg text-white text-bold">Latest Movies</Text>
              <FlatList data={movies}
                renderItem={({ item }) => (
                  <MoviesCard {...item}/>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 20
                }}
                className="pb-32 mt-2"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
