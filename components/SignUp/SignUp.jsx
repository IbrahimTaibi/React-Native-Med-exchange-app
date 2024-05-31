import React, {useState, useEffect, useRef, useContext} from 'react';
import Logo from '../Login/Logo';
import axios from 'axios';
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
  Image,
} from 'react-native';
import {styles} from './signupStyle';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFacebook,
  faGoogle,
  faExclamationCircle,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import {UserContext} from '../User/UserContext';
import {launchImageLibrary} from 'react-native-image-picker'; // Import the image picker

export default function SignUp() {
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null); // State for storing the photo

  // Validation states
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    if (!userName.trim()) {
      newErrors.userName = 'Username is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.length !== 8) {
      newErrors.phoneNumber = 'Phone number must be 8 digits';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpPress = async () => {
    if (!validateFields()) {
      return;
    }

    const formData = new FormData();
    formData.append('username', userName);
    formData.append('email', email);
    formData.append('phoneNumber', `216${phoneNumber}`);
    formData.append('password', password);
    formData.append('passwordConfirmation', password);
    if (photo) {
      formData.append('photo', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName || 'photo.jpg',
      });
    }

    try {
      const response = await axios.post(
        'https://med-exchangevf.onrender.com/api/v2/auth/signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('API Response:', response.data);

      if (
        response.data &&
        (response.data.status === 'success' ||
          response.data.status === 'succes')
      ) {
        const token = response.data.token;
        const user = response.data.data.user;

        await AsyncStorage.setItem('jwt', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        setUser(user);

        Alert.alert('Success', 'You have signed up successfully');
        navigation.navigate('Home', {user});
      } else {
        Alert.alert('Error', response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong',
      );
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleFacebookSignUp = () => {
    Alert.alert('Facebook Sign Up', 'Implement Facebook sign up functionality');
  };

  const handleGoogleSignUp = () => {
    Alert.alert('Google Sign Up', 'Implement Google sign up functionality');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Implement Forgot Password functionality');
  };

  const handlePhotoUpload = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else {
        setPhoto(response.assets[0]);
      }
    });
  };

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
            <Text style={styles.title}>Sign up and Heal</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#fff"
              value={userName}
              onChangeText={setUserName}
            />
            {errors.userName && (
              <View style={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={16}
                  color="#ff6f61"
                />
                <Text style={styles.errorText}>{errors.userName}</Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && (
              <View style={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={16}
                  color="#ff6f61"
                />
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            )}
            <View style={styles.phoneInputContainer}>
              <Image
                source={{
                  uri: 'https://www.countryflags.com/wp-content/uploads/tunisia-flag-png-large.png',
                }}
                style={styles.flag}
              />
              <Text style={styles.countryCode}>+216</Text>
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder="Phone Number"
                placeholderTextColor="#fff"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={8}
              />
            </View>
            {errors.phoneNumber && (
              <View style={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={16}
                  color="#ff6f61"
                />
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              </View>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#fff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && (
              <View style={styles.errorContainer}>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={16}
                  color="#ff6f61"
                />
                <Text style={styles.errorText}>{errors.password}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={handlePhotoUpload}
              style={styles.photoButton}>
              <FontAwesomeIcon icon={faCamera} size={24} color="#fff" />
              <Text style={styles.photoButtonText}>Upload your photo</Text>
            </TouchableOpacity>
            {photo && <Image source={{uri: photo.uri}} style={styles.photo} />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleFacebookSignUp}>
            <FontAwesomeIcon
              icon={faFacebook}
              size={24}
              color="#75cabc"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoogleSignUp}>
            <FontAwesomeIcon
              icon={faGoogle}
              size={24}
              color="#75cabc"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.policyText}>
          By signing up you accept our{' '}
          <Text style={styles.highlight}>policy and terms</Text>.
        </Text>
      </View>
    </LinearGradient>
  );
}
