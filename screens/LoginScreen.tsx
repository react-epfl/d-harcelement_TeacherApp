import {matrix} from '@rn-matrix/expo';
import * as React from 'react';

import { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Icon, Input, Button, Text, Spinner } from '@ui-kitten/components';

import { View } from '../components/Themed';

export default function LoginScreen() {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const homeserverValue = "https://scistidgsrv1.epfl.ch/";

  const handleLoginPress = async () => {
    if (usernameValue.length === 0) {
      setErrorText('login.missingUsernameError');
    } else if (passwordValue.length === 0) {
      setErrorText('login.missingPasswordError');
    } else {
      setErrorText('');
      setIsLoading(true);
      const response = matrix.loginWithPassword(
        usernameValue,
        passwordValue,
        homeserverValue,
        true,
      );
      if (response.error) {
        setIsLoading(false);
        setErrorText(response.message);
      }
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

  useEffect(() => {
    setErrorText('');
  }, [usernameValue, passwordValue]);

  return (
    <View style={styles.container}>
        <Input
            label='Username'
            placeholder='Username'
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
        <Button
            disabled={isLoading}
            onPress={ handleLoginPress }
            appearance='outline'
            size='medium'
            status='primary'>
                LogIn
        </Button>
        {errorText.length > 0 && (
          <Text status="danger" style={{textAlign: 'center', marginTop: 15}}>
            {errorText}
          </Text> 
        )}
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
});
