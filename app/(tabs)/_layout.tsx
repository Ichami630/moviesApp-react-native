import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'

const TabIcon = ({icon,title,focused}:any) => {

  return (
    focused ? (
      <ImageBackground 
      source={images.highlight}
      className='flex flex-1 justify-center items-center flex-row w-full min-w-[112px] min-h-16 mt-4 rounded-full overflow-hidden'>
      <Image source={icon} tintColor="#151312" className="size-5"/>
      <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
    </ImageBackground>
    ):(
      <View className='size-full justify-center items-center rounded-full mt-4'>
        <Image source={icon} tintColor="#A8B5DB" className="size-5 mt-4"/>
      </View>
    )
  )
}

const _layout = () => {
  return <Tabs 
    screenOptions={{ 
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      },
      tabBarStyle: {
        position: "absolute",
        backgroundColor: "#0f0D23",
        borderRadius: 50,
        height: 52,
        marginBottom: 20,
        marginHorizontal: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#0f0d23"
      }
      }}>
    <Tabs.Screen
      name="index"
      options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ( { focused }) => (
          <>
            <TabIcon icon={icons.home} title="Home" focused={focused}/>
          </>
        )
      }} 
    />
    <Tabs.Screen
      name="saved"
      options={{
        headerShown: false,
        title: 'Saved',
        tabBarIcon: ( { focused }) => (
          <>
            <TabIcon icon={icons.save} title="Saved" focused={focused}/>
          </>
        )
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        headerShown: false,
        title: 'Search',
        tabBarIcon: ( { focused }) => (
          <>
            <TabIcon icon={icons.search} title="Search" focused={focused}/>
          </>
        )
      }} 
    />
    <Tabs.Screen
      name="profile"
      options={{
        headerShown: false,
        title: 'Profile',
        tabBarIcon: ( { focused }) => (
          <>
            <TabIcon icon={icons.person} title="Profile" focused={focused}/>
          </>
        )
      }} 
    />
  </Tabs>
}

export default _layout