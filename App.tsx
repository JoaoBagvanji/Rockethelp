import React from 'react';


import { NativeBaseProvider, StatusBar } from 'native-base';
import { THEME } from './src/styles/theme';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


import { Loading } from './src/Components/Loading';
import { Routes } from './src/routes';


export default function App() {
  const [ fontsLoaded ] = useFonts ({ Roboto_400Regular, Roboto_700Bold });
  //if externário
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
    
  );
}

