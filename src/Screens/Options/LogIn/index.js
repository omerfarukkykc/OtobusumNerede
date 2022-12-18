
import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../../../Components/Background';
import Logo from '../../../Components/Logo';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import TextInput from '../../../Components/TextInput';
import BackButton from '../../../Components/BackButton';
import { styles } from './style';
import {theme} from '../../../Core/theme';
import {emailValidator} from '../../../Helpers/emailValidator';
import {passwordValidator} from '../../../Helpers/passwordValidator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiClient } from '../../../Network/ApiClient';
export default function LogIn({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [data, setData] = useState({success: false, loading: false});
  
  
  
  const onLoginPressed = async () => {
    
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    ApiClient.logIn(email.value,password.value).then((item) => {
      navigation.navigate('Anasayfa')
    })
  };
  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tekrar Hoşgeldiniz.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
  
}
