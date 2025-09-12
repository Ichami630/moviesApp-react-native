import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = "default",
  }: TextInputProps) => {
    return (
      <View className="w-full mb-4">
        {label ? <Text className="mb-1 text-white">{label}</Text> : null}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#a8b5db"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          className="w-full px-4 py-3 text-white rounded-full bg-primary"
        />
      </View>
    );
  };
  

export default Input