import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getFavorites } from '../Utils/Storage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs);
    };
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>Your Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('FavoriteDetail', { drink: item })}>
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
