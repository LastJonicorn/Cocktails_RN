import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import BackgroundWrapper from '../Components/BackgroundWrapper';
import logo from '../assets/CocktailLogo.png';

export default function InfoScreen() {
  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={logo}
          style={{ width: 200, height: 200, alignSelf: 'center', marginBottom: 20, }}
        />
        <View style={styles.container}>

          <Text style={styles.title}>📘 App Information & Responsible Use</Text>
          <Text style={styles.text}>
            Welcome to The Shaker’s Guide — your pocket companion to the world of cocktails and mixology.{"\n\n"}
            This app is designed for adults who are of legal drinking age and interested in exploring classic cocktails, discovering new drink recipes, and learning about the art and craft behind mixology.
          </Text>

          <Text style={styles.subtitle}>🍸 The Art of Mixology</Text>
          <Text style={styles.text}>
            Mixology is more than just mixing drinks — it's the craft and science of creating balanced, flavorful, and often visually stunning cocktails.{"\n\n"}
            A skilled mixologist understands ingredients, proportions, flavor profiles, and presentation. Whether you're crafting a classic or inventing something new, you're taking part in a tradition that spans centuries.
          </Text>

          <Text style={styles.subtitle}>🧠 Drink Mindfully</Text>
          <Text style={styles.text}>
            While exploring cocktails is fun, it's vital to drink responsibly:{"\n\n"}
            • Know your limits – moderation is key.{"\n"}
            • Never drink and drive – always plan ahead.{"\n"}
            • Stay hydrated – drink water between cocktails.{"\n"}
            • Respect the law – follow your local drinking age and regulations.{"\n"}
            • Take breaks – non-alcoholic options are always valid.
          </Text>

          <Text style={styles.subtitle}>🧭 Our Mission</Text>
          <Text style={styles.text}>
            The Shaker’s Guide is here to inspire curiosity, creativity, and appreciation for cocktail culture.{"\n\n"}
            We aim to educate, entertain, and promote safe habits in the process. If you or someone you know struggles with alcohol misuse, please seek help from a medical or support professional.
          </Text>

          <Text style={styles.subtitle}>📬 Feedback & Ideas</Text>
          <Text style={[styles.text,{marginBottom: 50}]}>
            Have a drink you’d love to see? Found a bug or want to request a feature? We’d love to hear from you.{"\n\n"}
            The Shaker’s Guide is built for enthusiasts like you.
          </Text>

        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});
