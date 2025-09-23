
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as SMS from "expo-sms";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [userProfile, setUserProfile] = useState<string | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showPreview, setShowPreview] = useState(false); 

  useEffect(() => {
    if (!status?.granted) {
      requestPermission();
    }
  }, [status]);
  const {user,logout,loading} = useAuth();

  const handleLogout = async () => {
    await logout()
  }

  const testapi = async () => {
    try {
      const res = await fetch("https://ssec.online/get_pending_sms.php", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const sms = await res.json();
      if(!sms) return;
      console.log(sms);

      const isAvailable = await SMS.isAvailableAsync();
      if(isAvailable) {
        const result = await SMS.sendSMSAsync([sms.phone],sms.message);
        console.log("sms send successfully",result);

      // Update backend
      await fetch("https://ssec.online/get_pending_sms.php", {
        method: "POST",
        body: new URLSearchParams({
          id: sms.id,
          status: result.result === "sent" ? "sent" : "failed",
        }),
      });
      }else{
        console.log("SMS not available on this device");
      }
    } catch (err) {
      console.error(err);
    }
  }
  


  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserProfile(result.assets[0].uri);
    }
    setShowSheet(false);
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserProfile(result.assets[0].uri);
    }
    setShowSheet(false);
  };
  if(loading) {
    return (
      <View className='items-center justify-center flex-1 bg-primary'>
        <ActivityIndicator size={'large'}  />
      </View>
    )
  }
  return (
    <ScrollView className="flex-1 bg-primary">
      {/* Header / Avatar */}
      <View className="items-center mt-12">
        <View className="relative">
          {/* 👇 Tap image to preview */}
          <TouchableOpacity onPress={() => setShowPreview(true)}>
            <Image
              source={{ uri: userProfile || "https://i.pravatar.cc/150?img=12" }}
              className="border-2 border-white rounded-full w-28 h-28"
            />
          </TouchableOpacity>

          {/* Camera Icon Overlay */}
          <TouchableOpacity
            className="absolute bottom-0 right-0 p-2 bg-gray-800 border border-white rounded-full"
            onPress={() => setShowSheet(true)}
          >
            <Ionicons name="camera" size={18} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="mt-4 text-2xl font-bold text-white">{user?.name}</Text>
        <Text className="text-gray-300">{user?.email}</Text>
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
        <TouchableOpacity className="p-4 bg-red-600 rounded-xl" onPress={handleLogout}>
          <Text className="text-base text-center text-white">Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-red-600 rounded-xl" onPress={testapi}>
          <Text className="text-base text-center text-white">testapi</Text>
        </TouchableOpacity>
      </View>

      {/* bottom sheet modal */}
      <Modal
        transparent
        visible={showSheet}
        animationType="slide"
        onRequestClose={() => setShowSheet(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/40"
          activeOpacity={1}
          onPressOut={() => setShowSheet(false)}
        >
          <View className="absolute bottom-0 w-full p-4 bg-white rounded-t-2xl">
            <Text className="mb-4 text-lg font-semibold text-center">Profile Picture</Text>
            <TouchableOpacity
              className="p-4 mb-2 bg-gray-200 rounded-lg"
              onPress={takePhoto}
            >
              <Text className="text-center text-black">📷 Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 mb-2 bg-gray-200 rounded-lg"
              onPress={pickFromGallery}
            >
              <Text className="text-center text-black">🖼 Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-4 bg-red-500 rounded-lg"
              onPress={() => setShowSheet(false)}
            >
              <Text className="text-center text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Fullscreen Preview Modal */}
      <Modal
        visible={showPreview}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPreview(false)}
      >
        <View className="items-center justify-center flex-1 bg-black">
          <TouchableOpacity
            style={{ position: "absolute", top: 40, right: 20 }}
            onPress={() => setShowPreview(false)}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: userProfile || "https://i.pravatar.cc/150?img=12" }}
            className="w-80 h-80 rounded-xl"
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
