import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import debounce from 'lodash.debounce';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [drinks, setDrinks] = useState([]);

  // Fetch drinks from TheCocktailDB
  const fetchDrinks = async (text) => {
    if (!text.trim()) {
      setDrinks([]);
      return;
    }

    try {
      const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
      const data = await res.json();
      setDrinks(data.drinks || []);
    } catch (error) {
      console.error('Error fetching drinks:', error);
    }
  };

  // Debounced search handler
  const debouncedSearch = useCallback(debounce(fetchDrinks, 400), []);

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <TextInput
        placeholder="Search for a drink..."
        value={query}
        onChangeText={handleChange}
        style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16 }}
      />
      <FlatList
        data={drinks}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DrinkDetail', { drink: item })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
              <Image source={{ uri: item.strDrinkThumb }} style={{ width: 50, height: 50, borderRadius: 6 }} />
              <Text style={{ marginLeft: 10 }}>{item.strDrink}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
