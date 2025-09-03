import useFetch from "@/hooks/useFetch";
import { getTrendingMovies } from "@/services/trending";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");


const TrendingCarousel = () => {
  const router = useRouter();
  const { data: trendingData = [] } = useFetch<TrendingMovie[]>(() => getTrendingMovies());

  if (!trendingData || trendingData.length === 0) return null;

  return (
    <Carousel
      loop
      width={width}
      height={300}
      autoPlay={true}
      autoPlayInterval={5000}
      data={trendingData}
      scrollAnimationDuration={800}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="flex-1"
          activeOpacity={0.4}
          onPress={() => router.push(`/movies/${item.movie_id}`)}
        >
          <ImageBackground
            source={{
              uri: item.poster_url
                ? `https://image.tmdb.org/t/p/w500${item.poster_url}`
                : "https://placehold.co/600x400/1a1a1a/ffffff.png",
            }}
            className="justify-end flex-1"
            resizeMode="cover"
          >
            <View className="p-4 bg-black/40">
              <Text className="text-lg font-bold text-white" numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    />
  );
};

export default TrendingCarousel;
