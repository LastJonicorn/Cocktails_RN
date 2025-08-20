import React from 'react';
import { View, Text, Button, Alert, BackHandler, SafeAreaView, Image } from 'react-native';
import { setAgeConfirmed } from '../Utils/Storage';
import globalStyles from '../Styles/Global';
import BackgroundWrapper from '../Components/BackgroundWrapper';
import logo from '../assets/CocktailLogo.png';

export default function AgeGateScreen({ navigation }) {
  const handleYes = async () => {
    await setAgeConfirmed();
    navigation.replace("MainApp"); // go to main app stack
  };

  const handleNo = () => {
    Alert.alert(
      "Access Denied",
      "You must be over 18 to use this app.",
      [{ text: "Exit", onPress: () => BackHandler.exitApp() }]
    );
  };

  return (
    <BackgroundWrapper>
      <Image
        source={logo}
        style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 75}}
      />
      <Text style={[globalStyles.title, {fontSize: 50, fontStyle: 'italic'}]}>The Shaker’s Guide</Text>
      <SafeAreaView style={[globalStyles.screen, { alignItems: 'center', marginTop: 50, }]}>
        <Text style={globalStyles.title}>Are you over 18?</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 100, alignSelf: 'center' }}>
            <Button title="Yes" onPress={handleYes} color="orange" />
          </View>
          <View style={{ width: 50 }} />
          <View style={{ width: 100, alignSelf: 'center' }}>
<           Button title="No" onPress={handleNo} color="gray" />
          </View>
        </View>
      </SafeAreaView>
    </BackgroundWrapper>
  );
}
