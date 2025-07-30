import React from 'react';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import { saveFavorite } from '../Utils/Storage';

export default function DrinkDetailScreen({ route }) {
  const { drink } = route.params;

const handleSave = async () => {
  await saveFavorite(drink); // Alert is handled inside the function
};


  return (
    <ScrollView style={{ padding: 20 }}>
      <Image source={{ uri: drink.strDrinkThumb }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{drink.strDrink}</Text>
      <Text style={{ marginBottom: 10 }}>{drink.strInstructions}</Text>
      <Button title="Save to Favorites" onPress={handleSave} />
    </ScrollView>
  );
}
