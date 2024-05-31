import React, {useEffect, useContext} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../User/UserContext';

export default function AutoLogin() {
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    const validateToken = async token => {
      try {
        const response = await fetch(
          'https://med-exchangevf.onrender.com/api/v2/auth/validateToken',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();
        if (response.ok && data.status === 'success') {
          return data.data.user;
        } else {
          throw new Error('Token validation failed');
        }
      } catch (error) {
        console.error('Token validation error:', error);
        return null;
      }
    };

    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt');
        const user = await AsyncStorage.getItem('user');

        if (token && user) {
          const validatedUser = await validateToken(token);
          if (validatedUser) {
            setUser(validatedUser);
            navigation.replace('Home');
          } else {
            navigation.replace('Login');
          }
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Failed to fetch token from storage:', error);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, [navigation, setUser]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#75cabc" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
