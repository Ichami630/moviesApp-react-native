import Input from '@/components/inputs/TextInput'
import useMutation from '@/hooks/useMutation'
import { SignIn } from '@/services/auth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from 'react-native'

const Login = () => {
  const {mutate: loginUser, loading, error} = useMutation(SignIn)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({...prev,[field]:value}))
  }

  const handleLogin = async () => {
    const {email, password} = formData
    if(!email || !password) {
      Alert.alert("Error", "Please fill all fields")
      return
    }
    try {
      const res = await loginUser(formData)
      if(res?.success) Alert.alert("Success", "login successfully")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View className='p-4 bg-white rounded-lg'>
      <Text className="mb-6 text-2xl font-bold text-center">Login</Text>
      {error && (<Text className="mb-2 text-center text-red-500">{error.message}</Text>)}
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
  )
}

export default Login