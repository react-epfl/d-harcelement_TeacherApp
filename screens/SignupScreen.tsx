import {matrix} from '@rn-matrix/expo';
import * as React from 'react';

import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Layout } from '@ui-kitten/components';
import * as sdk from "matrix-js-sdk";

import { View } from '../components/Themed';
import  { homeserverValue } from '../constants/Server';

export default function SignupScreen({ navigation }) {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');  
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  
  const handleSignupPress = async () => {
    const client = sdk.createClient(homeserverValue);
    const userRegisterResult = await client.register(
      usernameValue,
      passwordValue,
      null,
      { type: 'm.login.dummy' }
    );

    const matrixClient = await sdk.createClient({
      baseUrl: homeserverValue,
      userId: userRegisterResult.user_id,
      accessToken: userRegisterResult.access_token,
      deviceId: userRegisterResult.device_id
    });
    await matrixClient.startClient();
    navigation.navigate('LogIn');
    if (matrixClient.error) {
      console.log(matrixClient.message);
    }
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
});
