import React, { useState, useCallback } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image, Button } from 'react-native';
import debounce from 'lodash.debounce';
import globalStyles from '../Styles/Global';
import BackgroundWrapper from '../Components/BackgroundWrapper';
import {API_KEY} from '../Utils/Cloudflare';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState('name'); // 'name' or 'ingredient'
  const [drinks, setDrinks] = useState([]);

const fetchDrinks = async (text) => {
  if (!text.trim()) {
    setDrinks([]);
    return;
  }

  try {
    let url;
    if (searchMode === 'name') {
      url = `${API_KEY}search?query=${encodeURIComponent(text)}`;
    } else {
      url = `${API_KEY}searchByIngredient?ingredient=${encodeURIComponent(text)}`;
    }

    const res = await fetch(url);
    const raw = await res.text(); // Always read as text first
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Non-JSON response from Worker:", raw);
      data = { drinks: [] };
    }

    setDrinks(data.drinks || []);
  } catch (error) {
    console.error('Error fetching drinks:', error);
    setDrinks([]);
  }
};


  const debouncedSearch = useCallback(debounce(fetchDrinks, 400), [searchMode]);

  const handleChange = (text) => {
    setQuery(text);
    debouncedSearch(text);
  };

  const handleModeChange = (mode) => {
    setSearchMode(mode);
    setQuery('');
    setDrinks([]);
  };

  return (
    <BackgroundWrapper>
      <View>
        {/* Search mode buttons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          <Button
            title="Search by Name"
            color={searchMode === 'name' ? 'orange' : 'gray'}
            onPress={() => handleModeChange('name')}
          />
          <Button
            title="Search by Ingredient"
            color={searchMode === 'ingredient' ? 'orange' : 'gray'}
            onPress={() => handleModeChange('ingredient')}
          />
        </View>

        {/* Search box */}
        <TextInput
          placeholder={searchMode === 'name' ? "Search for a drink..." : "Search by ingredient..."}
          value={query}
          onChangeText={handleChange}
          style={{ borderBottomWidth: 1, marginBottom: 10, fontSize: 16 }}
        />

        {/* Results list */}
        <FlatList
          data={drinks}
          keyExtractor={(item) => item.idDrink}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('DrinkDetail', { drink: item })}
            >
              <View style={[globalStyles.card, { flexDirection: 'row', alignItems: 'center', marginVertical: 8 }]}>
                <Image
                  source={{ uri: item.strDrinkThumb }}
                  style={{ width: 75, height: 75, borderRadius: 6 }}
                />
                <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 18 }]}>
                  {item.strDrink}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </BackgroundWrapper>
  );
}
