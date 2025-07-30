import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function FavoriteDetailScreen({ route }) {
  const { drink } = route.params;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image source={{ uri: drink.strDrinkThumb }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{drink.strDrink}</Text>
      <Text style={{ marginBottom: 10, fontStyle: 'italic' }}>{drink.strAlcoholic} - {drink.strCategory}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Instructions:</Text>
      <Text style={{ marginBottom: 20 }}>{drink.strInstructions}</Text>

      {/* Optional: Show ingredients */}
      <Text style={{ fontWeight: 'bold' }}>Ingredients:</Text>
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
    </ScrollView>
  );
}
