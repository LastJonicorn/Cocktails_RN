import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchScreen from './Screens/SearchScreen';
import DrinkDetailScreen from './Screens/DrinkDetailScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import FavoriteDetailScreen from './Screens/FavoriteDetailScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="DrinkDetail" component={DrinkDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="FavoriteDetail" component={FavoriteDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
