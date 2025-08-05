import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { isAgeConfirmed } from './Utils/Storage';

// Screens
import SearchScreen from './Screens/SearchScreen';
import FavoritesScreen from './Screens/FavoritesScreen';
import DrinkDetailScreen from './Screens/DrinkDetailScreen';
import FavoriteDetailScreen from './Screens/FavoriteDetailScreen';
import RandomScreen from './Screens/RandomScreen';
import AgeGateScreen from './Screens/AgeGateScreen';
import InfoScreen from './Screens/InfoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const InnerStack = createNativeStackNavigator();

// Shared header with gear icon that opens drawer
const headerWithSettings = (navigation) => ({
  headerRight: () => (
    <Icon
      name="settings-outline"
      size={24}
      color="black"
      style={{ marginRight: 16 }}
      onPress={() => navigation.openDrawer()} // opens the drawer!
    />
  ),
});

// ----- Sub-stacks -----
function SearchStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Search"
        component={SearchScreen}
        options={({ navigation }) => headerWithSettings(navigation)}
      />
      <InnerStack.Screen name="DrinkDetail" component={DrinkDetailScreen} />
    </InnerStack.Navigator>
  );
}

function RandomStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Random"
        component={RandomScreen}
        options={({ navigation }) => headerWithSettings(navigation)}
      />
      <InnerStack.Screen name="DrinkDetail" component={DrinkDetailScreen} />
    </InnerStack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({ navigation }) => headerWithSettings(navigation)}
      />
      <InnerStack.Screen name="FavoriteDetail" component={FavoriteDetailScreen} />
    </InnerStack.Navigator>
  );
}

// ---- Bottom Tabs ----
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = route.name === 'SearchTab'
            ? 'search'
            : route.name === 'RandomTab'
            ? 'dice-outline'
            : 'heart';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Search' }} />
      <Tab.Screen name="RandomTab" component={RandomStack} options={{ title: 'Random' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesStack} options={{ title: 'Favorites' }} />
    </Tab.Navigator>
  );
}

// ---- Drawer wraps the tabs ----
function DrawerWrapper() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right', // optional
      }}
    >
      <Drawer.Screen 
        name="HomeTabs" 
        component={MainTabs} 
        options={{ 
          title: 'Home',
        }} 
      />
      <Drawer.Screen 
        name="Info" 
        component={InfoScreen} 
        options={{ 
          title: 'App Info',
          headerShown: true,
        }} 
      />
      {/* Future drawer settings can go here */}
    </Drawer.Navigator>
  );
}

// ---- Root App Entry Point ----
export default function App() {
  const [checkedAge, setCheckedAge] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkAge = async () => {
      const confirmed = await isAgeConfirmed();
      setAllowed(confirmed);
      setCheckedAge(true);
    };
    checkAge();
  }, []);

  if (!checkedAge) return null;

  const initialRoute = allowed ? "MainApp" : "AgeGate";

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="AgeGate" component={AgeGateScreen} />
        <Stack.Screen name="MainApp" component={DrawerWrapper} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
