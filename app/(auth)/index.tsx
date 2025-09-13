import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const GetStarted = () => {
  const router = useRouter();

  return (
    <View className="items-center justify-between flex-1 p-6 bg-white">
      {/* Top logo / illustration */}
      <View className="items-center mt-12">
        <Image
          source={icons.logo}
          className="w-64 h-64"
          resizeMode="contain"
        />
        <Text className="mt-6 text-3xl font-bold text-center">
          Welcome to MovieApp
        </Text>
        <Text className="px-4 mt-2 text-center text-gray-500">
          Discover trending movies, create watchlists, and never miss a hit again!
        </Text>
      </View>

      {/* Buttons */}
      <View className="w-full mb-12 space-y-4">
        <TouchableOpacity
          className="items-center w-full py-4 rounded-full bg-accent"
          onPress={() => router.push("/(auth)/register")}
        >
          <Text className="text-lg font-bold text-white">Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center w-full py-4 mt-4 border border-gray-300 rounded-full"
          onPress={() => router.push("/(auth)/login")}
        >
          <Text className="text-lg font-bold text-gray-700">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;
