import { matrix } from '@rn-matrix/expo';
import '@rn-matrix/expo/shim';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useObservableState } from 'observable-hooks';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './theme.json'; 

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';

export default function App() {
  const Stack = createStackNavigator();
  const colorScheme = useColorScheme();
  
  const authLoggedIn = useObservableState(matrix.isLoggedIn$());

  if (authLoggedIn) {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </>
    );
  } else {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="d-harcelement" component={LoginScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}
