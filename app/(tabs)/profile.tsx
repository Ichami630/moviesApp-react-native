import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Header / Avatar */}
      <View className="items-center mt-12">
        <View className="relative">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            className="border-2 border-white rounded-full w-28 h-28"
          />

          {/* Camera Icon Overlay */}
          <TouchableOpacity
            className="absolute bottom-0 right-0 p-2 bg-gray-800 border border-white rounded-full"
            onPress={() => console.log("Change profile picture")}
          >
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-2xl font-bold text-white">Ichami Doe</Text>
        <Text className="text-gray-300">ichamidoe@email.com</Text>
      </View>

      {/* Stats */}
      <View className="flex-row justify-around px-4 mt-8">
        <View className="items-center">
          <Text className="text-xl font-bold text-white">12</Text>
          <Text className="text-gray-400">Saved</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-white">8</Text>
          <Text className="text-gray-400">Reviews</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-white">20</Text>
          <Text className="text-gray-400">Favorites</Text>
        </View>
      </View>

      {/* Actions */}
      <View className="flex flex-col gap-4 px-6 mt-10">
        <TouchableOpacity className="p-4 bg-gray-800 rounded-xl">
          <Text className="text-base text-white">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-gray-800 rounded-xl">
          <Text className="text-base text-white">Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-gray-800 rounded-xl">
          <Text className="text-base text-white">Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-red-600 rounded-xl">
          <Text className="text-base text-center text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
