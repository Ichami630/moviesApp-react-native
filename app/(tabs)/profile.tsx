import { fetchMovies, testApi } from '@/services/api';
import useFetch from '@/services/useFetch';
import React from 'react';
import { Text, View } from 'react-native';

const Profile = () => {
  const {data: testData,
    loading: testLoading,
    error: testError,
  } = useFetch(() => testApi())

  const {data: moviesData,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({query:""}))

  if(!testLoading || !testError || !moviesLoading || !moviesError){
    console.log(testData)
    // console.log(moviesData)
  }

  return (
    <View className="items-center justify-center flex-1 bg-primary">
      <Text className="text-xl text-white">profile</Text>
    </View>
  );
};

export default Profile;
