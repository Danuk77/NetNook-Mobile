import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import { useCallback, useState, useMemo } from 'react';

// Import the encrypted persistant store
import EncryptedStorage from 'react-native-encrypted-storage';

function App(): JSX.Element {

  const [integrationKey, setIntegrationKey] = useState<string>("");
  const [dataBaseID, setDatabaseID] = useState<string>("");

  /**
   * Generic function to handle the changes in react states from user inputs
   * @param newVal 
   * @param changeFunction 
   */
  const changeState = (newVal: string, changeFunction: React.Dispatch<React.SetStateAction<string>>) => {
    changeFunction(newVal);
  };

  /**
   * Store the integration and database keys within the native stores (Android -> EncryptedSharedPreferences, ios -> Keychain)
   */
  const storeKeys = useCallback(async () => {
    try {
      await EncryptedStorage.setItem(
        "UserKeys",
        JSON.stringify({
          integrationKey: integrationKey,
          dataBaseID: dataBaseID
        })
      );

      Alert.alert("Configured");
    } catch (err) {
      console.log(err);
    }
  }, [integrationKey, dataBaseID]);


  /**
   * Function called when app starts up
   * Populates the integration and database id fields from the encrypted keys stored in the native stores
   */
  const populateFields = useEffect(() => {
    async function getKeys() {
      try {
        const session = await EncryptedStorage.getItem("UserKeys");

        if (session !== undefined) {
          // Congrats! You've just retrieved your first value!
          setIntegrationKey(JSON.parse(session!)["integrationKey"]);
          setDatabaseID(JSON.parse(session!)["dataBaseID"]);
        } else {
          Alert.alert("Please enter the integration key and the database id");
        }
      } catch (error) {
        // There was an error on the native side
        console.log(error);
      }
    };

    // Call the keys
    getKeys();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      {/* Configuration heading */}
      <Image
        style={{
          width: 300,
          alignSelf: 'center',
          resizeMode: 'contain',
          marginTop: 100
        }}
        source={require('./Assets/Configuration.png')}
      />

      <View style={{ marginTop: 50 }}>
        {/* For the integration key */}
        <Text style={styles.headings}>Integration Key</Text>
        <TextInput
          value={integrationKey}
          style={styles.inputs}
          placeholder='Key'
          onChangeText={(text) => changeState(text, setIntegrationKey)}
        />

        {/* For the database id */}
        <Text style={styles.headings}>Database ID</Text>
        <TextInput
          value={dataBaseID}
          style={styles.inputs}
          placeholder='Key'
          onChangeText={(text) => changeState(text, setDatabaseID)}
        />
      </View>

      {/* Alternate log in Google button */}
      <View style={styles.submit}>
        <TouchableOpacity onPress={storeKeys}>
          <Image
            resizeMode="contain"
            source={require('./Assets/Submit.png')}
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView >);
};

// Styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCF5ED',
    color: '#1C1D21',
  },
  inputs: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  headings: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
    marginLeft: '5%'
  },
  submit: {
    alignSelf: 'center',
    width: '50%',
    height: 50,
    marginTop: 30
  }
});

export default App;
