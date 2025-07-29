import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Image source={{ uri: drink.strDrinkThumb }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{drink.strDrink}</Text>
      <Text style={{ fontWeight: 'bold' }}>Instructions:</Text>
      <Text>{drink.strInstructions}</Text>
    </ScrollView>
  );
}
