import React from 'react';
import { View, Text, Image, Button, ScrollView, Alert, SafeAreaView } from 'react-native';
import { saveFavorite } from '../Utils/Storage';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;

  const handleSave = async () => {
    try {
      const saved = await saveFavorite(drink);
    } catch (e) {
      console.error("Save error:", e);
      Alert.alert("Error", "Could not save this drink.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image
          source={{ uri: drink.strDrinkThumb }}
          style={{ width: '100%', height: 200, borderRadius: 10 }}
        />

        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
          {drink.strDrink}
        </Text>
        <Text style={{ fontStyle: 'italic', marginBottom: 10 }}>
          {drink.strAlcoholic} • {drink.strCategory}
        </Text>

        <Text style={{ fontWeight: 'bold', marginTop: 16 }}>Instructions</Text>
        <Text>{drink.strInstructions}</Text>

        <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 16 }}>Ingredients</Text>
        {Array.from({ length: 15 }, (_, i) => {
          const ingredient = drink[`strIngredient${i + 1}`];
          const measure = drink[`strMeasure${i + 1}`];
          if (ingredient) {
            return (
              <Text key={i} style={{ marginVertical: 2 }}>
                • {measure ? `${measure.trim()} ` : ''}{ingredient}
              </Text>
            );
          }
          return null;
        })}
          <Button
            title="Save to Favorites"
            onPress={handleSave}
            color="#4CAF50"
          />
      </ScrollView>
    </SafeAreaView>
  );
}