import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import globalStyles from '../Styles/Global';
import BackgroundWrapper from '../Components/BackgroundWrapper';

export default function FavoriteDetailScreen({ route }) {
  const { drink } = route.params;

  return (
    <BackgroundWrapper>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>

          <Text style={globalStyles.title}>{drink.strDrink}</Text>

          <Image source={{ uri: drink.strDrinkThumb }} style={{ width: '100%', height: 300, borderRadius: 10 }} />
          
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
