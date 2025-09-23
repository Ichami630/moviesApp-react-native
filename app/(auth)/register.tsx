import Input from "@/components/inputs/TextInput";
import useMutation from "@/hooks/useMutation";
import { Signup } from "@/services/auth";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";

const Register = () => {
  const {mutate: registerUser, loading,error} = useMutation(Signup)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({...prev,[field]:value}))
  }

  const handleRegister = async () => {
    const {name,email,password} = formData
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await registerUser(formData);
      if (response?.success) Alert.alert("Success", "Registered!");
      else Alert.alert("Error", response?.message || "An unknown error occured, please try again");
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <View className='justify-center flex-1 px-10 bg-primary'>
    <View className="p-4 bg-white rounded-lg">
      <Text className="mb-6 text-2xl font-bold text-center">Register</Text>
      {error && (<Text className="mb-2 text-center text-red-500">{error.message}</Text>)}
      <Input placeholder="Full Name" value={formData.name} onChangeText={text => handleChange('name',text)}/>
      <Input placeholder="Email" value={formData.email} onChangeText={text => handleChange('email',text)} keyboardType="email-address" />
      <Input placeholder="Password" value={formData.password} onChangeText={text => handleChange('password',text)} secureTextEntry />
      <Input placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />

      <TouchableOpacity
        className="items-center w-full py-3 rounded-full bg-accent"
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ):(
          <Text className="text-lg font-bold text-white">Register</Text>
        )}
      </TouchableOpacity>
      <Text className="mt-2">
        Already Have an Account ? <Link className="underline text-accent" href={"/(auth)/login"}>login</Link>
      </Text>
    </View>
    </View>
  );
};

export default Register;
