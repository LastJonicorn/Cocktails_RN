import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = async () => {
    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    setDrinks(data.drinks || []);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Search cocktails"
        value={query}
        onChangeText={setQuery}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Search" onPress={fetchDrinks} />
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DrinkDetail', { drink: item })}>
            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <Image source={{ uri: item.strDrinkThumb }} style={{ width: 60, height: 60, borderRadius: 5 }} />
              <Text style={{ marginLeft: 10, fontSize: 16 }}>{item.strDrink}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
