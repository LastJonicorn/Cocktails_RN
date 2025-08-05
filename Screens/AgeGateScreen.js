import React from 'react';
import { View, Text, Button, Alert, BackHandler, SafeAreaView } from 'react-native';
import { setAgeConfirmed } from '../Utils/Storage';
import globalStyles from '../Styles/Global';

export default function AgeGateScreen({ navigation }) {
  const handleYes = async () => {
    await setAgeConfirmed();
    navigation.replace("MainTabs"); // go to main app stack
  };

  const handleNo = () => {
    Alert.alert(
      "Access Denied",
      "You must be over 18 to use this app.",
      [{ text: "Exit", onPress: () => BackHandler.exitApp() }]
    );
  };

  return (
    <SafeAreaView style={[globalStyles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={globalStyles.title}>Are you over 18?</Text>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Button title="Yes" onPress={handleYes} color="orange" />
        <View style={{ width: 20 }} />
        <Button title="No" onPress={handleNo} color="gray" />
      </View>
    </SafeAreaView>
  );
}
