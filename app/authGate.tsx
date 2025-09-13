import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const AuthGate = () => {
  const {accessToken, loading} = useAuth();
  const router = useRouter()

  useEffect(()=>{
    if(!loading){
        if(accessToken){
            router.replace("/(tabs)")
        }else{
            router.replace("/(auth)/login")
        }
    }
  },[accessToken,loading,router])
  return (
    <View className='items-center justify-center flex-1'>
      <ActivityIndicator size={"large"} />
    </View>
  )
}

export default AuthGate