import Input from '@/components/inputs/TextInput'
import { useAuth } from '@/context/AuthContext'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const {login} = useAuth()
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({...prev,[field]:value}))
  }

  const handleLogin = async () => {
    setLoading(true)
    const {email, password} = formData
    if(!email || !password) {
      Alert.alert("Error", "Please fill all fields")
      return
    }
    try {
      const success = await login(email, password); 
      if (success) {
        Alert.alert("Success", "Login successfully");
        setTimeout(() => {
          router.push("/(tabs)");
        }, 500);
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }finally{
      setLoading(false)
    }
  }
  return (
    <View className='justify-center flex-1 px-10 bg-primary'>
    <View className='p-4 bg-white rounded-lg'>
      <Text className="mb-6 text-2xl font-bold text-center">Login</Text>
      <Input placeholder="Email" value={formData.email} onChangeText={text => handleChange('email',text)} keyboardType="email-address" />
      <Input placeholder="Password" value={formData.password} onChangeText={text => handleChange('password',text)} secureTextEntry />
      <TouchableOpacity
        className="items-center w-full py-3 rounded-full bg-accent"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ):(
          <Text className="text-lg font-bold text-white">Login</Text>
        )}
      </TouchableOpacity>
      <Text className="mt-2">
        Don{`'`}t Have an Account ? <Link className="underline text-accent" href={"/(auth)/register"}>signup</Link>
      </Text>
    </View>
    </View>
  )
}

export default Login