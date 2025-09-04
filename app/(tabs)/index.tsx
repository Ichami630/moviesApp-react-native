import SearchBar from "@/components/inputs/SearchBar";
import LatestMovies from "@/components/LatestMovies";
import TrendingCarousel from "@/components/TrendingCarousel";
import TrendingMovies from "@/components/TrendingMovies";
import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Animated, Dimensions, Image, View } from "react-native";

const { width } = Dimensions.get("window");
const CAROUSEL_HEIGHT = 300; // same as your carousel height

export default function Index() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate header background
  const headerBackground = scrollY.interpolate({
    inputRange: [0, CAROUSEL_HEIGHT - 100],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"], // transparent → dark
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 bg-primary">
      {/* Sticky/Overlay Header */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          justifyContent: "flex-end",
          paddingHorizontal: 16,
          paddingBottom: 4,
          backgroundColor: headerBackground, // animated bg
          zIndex: 10,
        }}
        className="justify-end px-4 pb-2"
      >
        <View className="flex-row items-center">
          <Image source={icons.logo} className="w-12 h-12 mr-4" resizeMode="contain" />
          <View className="flex-1">
            <SearchBar
              placeholder="Search for movies"
              autoFocus={false}
              onPress={() => router.push("/search")}
            />
          </View>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.FlatList
        data={[]} // just for scrolling
        renderItem={null}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        ListHeaderComponent={
          <>
            {/* Carousel */}
            <View style={{ height: CAROUSEL_HEIGHT }}>
              <TrendingCarousel />
            </View>

            {/* Offset for sticky header */}
            <View className="px-4 mt-10">
              <TrendingMovies />
              <LatestMovies />
            </View>
          </>
        }
      />
    </View>
  );
}
