import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLoginPress,
  handleForgotPassword,
}) {
  return (
    <View style={styles.form}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail} // Update prop here
        value={email} // Update prop here
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={[styles.loginButton, styles.input]}
        onPress={handleLoginPress}>
        <Text style={[styles.buttonText, {color: '#75cabc'}]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: '#75cabc',
    fontFamily: 'Roboto-Black',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#75cabc',
    borderWidth: 0.5,
    padding: 3,
    marginBottom: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#75cabc',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto Thin',
    fontSize: 16,
    textAlign: 'center',
  },
  forgotPasswordText: {
    color: '#75cabc',
    fontSize: 12,
    marginTop: 10,
  },
});
