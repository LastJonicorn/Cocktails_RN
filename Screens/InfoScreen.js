import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundWrapper from '../Components/BackgroundWrapper';

export default function InfoScreen() {
  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Drink Responsibly</Text>
        <Text style={styles.text}>
          This app is intended for users aged 18+ and promotes responsible alcohol consumption.
          If you or someone you know is struggling with alcohol misuse, please seek professional help.
        </Text>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  text: { fontSize: 16 },
});
