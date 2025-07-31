import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const FAVORITES_KEY = 'favoriteDrinks';

export const saveFavorite = async (drink) => {
  try {
    const existing = await getFavorites();

    const alreadySaved = existing.some((item) => item.idDrink === drink.idDrink);
    if (alreadySaved) {
      Alert.alert("Already Saved", `${drink.strDrink} is already in your favorites.`);
      return false;
    }

    const updated = [...existing, drink];
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    Alert.alert("Saved!", `${drink.strDrink} added to favorites.`);
    return true;
  } catch (e) {
    console.error("Error saving favorite:", e);
    Alert.alert("Error", "Failed to save favorite.");
    return false;
  }
};

export const getFavorites = async () => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error reading favorites:', e);
    return [];
  }
};

export const removeFavorite = async (id) => {
  try {
    const existing = await getFavorites();
    const updated = existing.filter((drink) => drink.idDrink !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error removing favorite:', e);
  }
};

