import {matrix} from '@rn-matrix/expo';
import { useObservableState } from 'observable-hooks';
import * as React from 'react';

import { Text, StyleSheet, Button, Image } from 'react-native';

import { View } from '../components/Themed';

export default function SettingsScreen() {
  const myUser = matrix.getMyUser();
  
  const userName = useObservableState(myUser.name$);
  
  const logout = () => {
    matrix.logout();
  };

  return (
    <View style={styles.container}>
        <Text style={styles.circle}> { userName?.charAt(0) } </Text>
        <Text>
          { userName }
        </Text>
      <Button
        onPress={logout}
        title="Logout"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    width: "90%",
    height: 50,
    borderColor: 'black',
    borderWidth: 2
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'blue',
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 32,   
}
});
