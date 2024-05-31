import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function Logo({style}) {
  return (
    <Image
      source={require('../../assets/logo/logo-dark.png')}
      style={[styles.logo, style]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
