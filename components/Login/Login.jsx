import React, {useState, useEffect, useRef, useContext} from 'react';
import Logo from './Logo';
import SignUpText from './SignUpText';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFacebook, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {UserContext} from '../User/UserContext'; // Import UserContext
import {styles} from './loginStyles';

export default function Login() {
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext); // Destructure setUser from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        const response = await fetch(
          'https://med-exchangevf.onrender.com/api/v2/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          },
        );

        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          if (data.token) {
            await AsyncStorage.setItem('jwt', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.data.user));

            const user = data.data.user;
            console.log('User data:', user);
            setUser(user); // Update user context
            navigation.navigate('Home');
          } else {
            Alert.alert('Error', 'Token not found in the response');
          }
        } else {
          Alert.alert('Error', data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error occurred:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Email and password cannot be empty');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Implement Facebook login functionality');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Implement Google login functionality');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Implement Forgot Password functionality');
  };

  // Animation logic
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceValue]);

  return (
    <LinearGradient colors={['#75cabc', '#469496']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Animated.View
              style={[
                styles.logoCircle,
                {transform: [{translateY: bounceValue}]},
              ]}>
              <Logo style={styles.logo} />
            </Animated.View>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleBold}>Medex</Text>
            <Text style={styles.title}>Connect, Share & Heal</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username / Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmail('')}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onFocus={() => setPassword('')}
            />
          </View>
          <SignUpText />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <FontAwesomeIcon
              icon={faFacebook}
              size={24}
              color="#75cabc"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <FontAwesomeIcon
              icon={faGoogle}
              size={24}
              color="#75cabc"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.policyText}>
          You can always check our{' '}
          <Text style={styles.highlited}>policies and terms</Text>.
        </Text>
      </View>
    </LinearGradient>
  );
}
