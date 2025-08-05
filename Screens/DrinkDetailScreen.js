import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, ScrollView, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { saveFavorite, getFavorites } from '../Utils/Storage';
import globalStyles from '../Styles/Global';
import BackgroundWrapper from '../Components/BackgroundWrapper';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkIfFavorite = async () => {
      const favorites = await getFavorites();
      const exists = favorites.some(d => d.idDrink === drink.idDrink);
      setIsFavorite(exists);
    };
    checkIfFavorite();
  }, []);

  const handleSave = async () => {
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

  return (
    <BackgroundWrapper>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
          
          {/* Title + Heart Icon Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={[globalStyles.title, { flex: 1, textAlign: 'left' }]}>
              {drink.strDrink}
            </Text>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={50}
                color={isFavorite ? 'red' : 'gray'}
              />
            </TouchableOpacity>
          </View>

          <Image
            source={{ uri: drink.strDrinkThumb }}
            style={{ width: '100%', height: 300, borderRadius: 10 }}
          />

          {/* Metadata */}
          <Text style={globalStyles.text}>
            {drink.strAlcoholic} • {drink.strCategory}
          </Text>

          {/* Instructions */}
          <View style={globalStyles.card}>
            <Text style={globalStyles.subhead}>Instructions:</Text>
            <Text style={globalStyles.text}>{drink.strInstructions}</Text>
          </View>

          {/* Ingredients */}
          <View style={globalStyles.card}>
            <Text style={globalStyles.subhead}>Ingredients:</Text>
            {Array.from({ length: 15 }, (_, i) => {
              const ingredient = drink[`strIngredient${i + 1}`];
              const measure = drink[`strMeasure${i + 1}`];
              if (ingredient) {
                return (
                  <Text key={i}>
                    • {measure ? `${measure} ` : ''}{ingredient}
                  </Text>
                );
              }
              return null;
            })}
          </View>

        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
}
