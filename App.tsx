import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

function App(): JSX.Element {
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
        <Text style={styles.headings}>Integration Key</Text>
        <TextInput
          style={styles.inputs}
          placeholder='Key'
        />

        <Text style={styles.headings}>Database Key</Text>
        <TextInput
          style={styles.inputs}
          placeholder='Key'
        />
      </View>
    </SafeAreaView>);
}

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
  }
});

export default App;
