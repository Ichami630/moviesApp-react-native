import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import { Image, Text, View } from 'react-native'

const SplashScreen = () => {
    const router = useRouter()

    //redirect the user to the home page after a 10 seconds
    useEffect(()=> {
        const timer = setTimeout(()=>{
            router.replace("/(tabs)")
        },3000)
        return () => clearTimeout(timer)
    },[router])
  return (
    <View className='flex-col items-center justify-center flex-1 bg-primary'>
        <Image source={icons.logo} className='w-20 h-20' resizeMode='center'/>
        <Text className='text-lg text-white'>Experience Your Epic Movies....</Text>
    </View>
  )
}

export default SplashScreen