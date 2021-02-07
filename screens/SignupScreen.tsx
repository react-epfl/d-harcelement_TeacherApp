import {matrix} from '@rn-matrix/expo';
import * as React from 'react';

import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout } from '@ui-kitten/components';
import Constants from 'expo-constants';
import * as sdk from "matrix-js-sdk";

import { View } from '../components/Themed';
import  { homeserverValue } from '../constants/Server';

export default function SignupScreen() {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');  
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const client = sdk.createClient(homeserverValue);
  console.log(client);

  const handleSignupPress = async () => {
    return fetch(homeserverValue + '/_matrix/client/r0/register?kind=${encodeURIComponent("user")}', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: usernameValue,
          password: passwordValue,
          device_id: Constants.deviceId,
          initial_device_display_name: nameValue + ' ' + surnameValue,
          inhibit_login: false
        })
    })
      .then((response) => response.json())
      .then((json) => {
        return json.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
        <Layout style={styles.rowContainer} level='1'>
            <Input
                placeholder='Name'
            />
            <Input
                placeholder='Surname'
            />
        </Layout>
        <Input
            label='Username'
            placeholder='Username'
            caption='Username must not be empty, and must contain only the characters a-z, 0-9, ., _, =, -, and /.'
            captionIcon={evaProps => <Icon {...evaProps} name='alert-circle-outline'/>}
            onChangeText={setUsernameValue}
            autoCapitalize='none'
        />
        <Input
            label='Password'
            placeholder='Password'
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={setPasswordValue}
        />
        {errorText.length > 0 && (
          <Text status="danger" style={{textAlign: 'center', marginTop: 15}}>
            {errorText}
          </Text> 
        )}
        <Button
            disabled={isLoading}
            onPress={ handleSignupPress }
            appearance='outline'
            size='medium'
            status='primary'>
                SignUp
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
