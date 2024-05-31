/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFacebookSquare, faGoogle} from '@fortawesome/free-brands-svg-icons';

export default function SocialButtons({
  handleFacebookLogin,
  handleGoogleLogin,
}) {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        onPress={handleFacebookLogin}
        style={[styles.socialButton, styles.input]}>
        <FontAwesomeIcon
          icon={faFacebookSquare}
          size={24}
          color="#4267B2"
          style={styles.icon}
        />
        <Text style={[styles.socialButtonText, {color: '#4267B2'}]}>
          Login with Facebook
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleGoogleLogin}
        style={[styles.socialButton, styles.input]}>
        <FontAwesomeIcon
          icon={faGoogle}
          size={24}
          color="#DB4437"
          style={styles.icon}
        />
        <Text style={[styles.socialButtonText, {color: '#DB4437'}]}>
          Login with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  socialButtonText: {
    color: '#4267B2',
    fontFamily: 'Roboto Thin',
    fontSize: 12,
    textAlign: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
});
