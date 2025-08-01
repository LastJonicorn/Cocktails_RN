import React, { useState, useEffect } from 'react';
import {View,Text,Image,ScrollView,SafeAreaView,Alert,TouchableOpacity,ActivityIndicator,Button,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import globalStyles from '../Styles/Global';
import { saveFavorite, getFavorites } from '../Utils/Storage';

export default function RandomScreen() {
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRandomDrink = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await res.json();
      const newDrink = data.drinks[0];
      setDrink(newDrink);
      checkIfFavorite(newDrink);
    } catch (err) {
      console.error('Error fetching random drink:', err);
      Alert.alert('Error', 'Could not fetch random drink.');
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async (drinkToCheck) => {
    const favorites = await getFavorites();
    const exists = favorites.some((d) => d.idDrink === drinkToCheck.idDrink);
    setIsFavorite(exists);
  };

  const handleSave = async () => {
    if (!drink) return;

    if (isFavorite) {
      Alert.alert("Already Saved", `${drink.strDrink} is already in your favorites.`);
      return;
    }

    try {
      const saved = await saveFavorite(drink);
      if (saved) {
        setIsFavorite(true);
      }
    } catch (e) {
      console.error("Save error:", e);
      Alert.alert("Error", "Could not save this drink.");
    }
  };

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  if (loading || !drink) {
    return (
      <SafeAreaView style={globalStyles.screen}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.screen}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Title & Save */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={[globalStyles.title, { flex: 1, textAlign: 'left' }]}>
            {drink.strDrink}
          </Text>
          <TouchableOpacity onPress={handleSave}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={30}
              color={isFavorite ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        {/* Image */}
        <Image
          source={{ uri: drink.strDrinkThumb }}
          style={{ width: '100%', height: 300, borderRadius: 10, marginBottom: 16 }}
        />

        {/* Metadata */}
        <Text style={globalStyles.text}>
          {drink.strAlcoholic} • {drink.strCategory}
        </Text>

        {/* Instructions */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.subhead}>Instructions</Text>
          <Text style={globalStyles.text}>{drink.strInstructions}</Text>
        </View>

        {/* Ingredients */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.subhead}>Ingredients</Text>
          {Array.from({ length: 15 }, (_, i) => {
            const ingredient = drink[`strIngredient${i + 1}`];
            const measure = drink[`strMeasure${i + 1}`];
            if (ingredient) {
              return (
                <Text key={i} style={globalStyles.text}>
                  • {measure ? `${measure.trim()} ` : ''}{ingredient}
                </Text>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>

      {/* Refresh Button */}
      <View style={globalStyles.button}>
        <Button
          title="Get Another Random Drink"
          onPress={fetchRandomDrink}
          color="#2196F3"
        />
      </View>

    </SafeAreaView>
  );
}
