import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Button, Alert } from 'react-native';
import { getFavorites, removeFavorite } from '../Utils/Storage';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

const handleRemove = (idDrink, name) => {
  Alert.alert(
    "Remove Favorite",
    `Are you sure you want to remove ${name} from your favorites?`,
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Remove",
        style: "destructive",
        onPress: async () => {
          await removeFavorite(idDrink);
          loadFavorites(); // refresh list
          Alert.alert("Removed", `${name} has been removed from favorites.`);
        },
      },
    ],
    { cancelable: true }
  );
};


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idDrink}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8, justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              onPress={() => navigation.navigate('FavoriteDetail', { drink: item })}
            >
              <Image source={{ uri: item.strDrinkThumb }} style={{ width: 50, height: 50, borderRadius: 6 }} />
              <Text style={{ marginLeft: 10 }}>{item.strDrink}</Text>
            </TouchableOpacity>
            <Button
              title="Remove"
              color="crimson"
              onPress={() => handleRemove(item.idDrink, item.strDrink)}
            />
          </View>
        )}
      />
    </View>
  );
}
