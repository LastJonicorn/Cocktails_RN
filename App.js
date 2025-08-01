import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchScreen from './Screens/SearchScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import DrinkDetailScreen from './Screens/DrinkDetailScreen';
import FavoriteDetailScreen from './Screens/FavoriteDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Search stack ---
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="DrinkDetail" component={DrinkDetailScreen} />
    </Stack.Navigator>
  );
}

// --- Favorites stack ---
function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="FavoriteDetail" component={FavoriteDetailScreen} />
    </Stack.Navigator>
  );
}

// --- App container ---
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // hide default tab header
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'SearchTab' ? 'search' : 'heart';
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{ title: 'Search' }}
        />
        <Tab.Screen
          name="FavoritesTab"
          component={FavoritesStack}
          options={{ title: 'Favorites' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
