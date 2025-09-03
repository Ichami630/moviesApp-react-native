import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
    autoFocus?: boolean;
}

const SearchBar = ({placeholder,onPress,value,onChangeText,autoFocus = true}:Props) => {
  return (
    <View className='flex-row items-center px-5 py-4 rounded-full bg-dark-200'>
        <Image source={icons.search} className="size-5 tint-dark-100" resizeMode='contain' tintColor="#ab8bff"/>
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#a8b5db"
            className='flex-1 ml-2 font-medium text-white'
            onPress={onPress}
            value={value}
            onChangeText={onChangeText}
            autoFocus={autoFocus}
        />
    </View>
  )
}

export default SearchBar