import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute, useNavigation} from '@react-navigation/native';
import logo from '../../../assets/logo/logo-dark.png'; // Make sure the path to your logo is correct
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import StepIndicator from '../StepIndicator';
import {styles} from './MedicationFormStyles';
import FormSteps from './FormSteps';

const MedicationForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = route.params || {}; // Get user data from route params

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedIndications, setSelectedIndications] = useState([]);
  const [step, setStep] = useState(1); // State to manage form steps
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [location, setLocation] = useState('');

  const animation = useRef(new Animated.Value(0)).current;
  const nextButtonOpacity = useRef(new Animated.Value(0)).current;
  const nextButtonTranslateX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    Animated.timing(animation, {
      toValue: -300, // Adjust this value based on your needs
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(step + 1);
      animation.setValue(300);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePrevious = () => {
    Animated.timing(animation, {
      toValue: 300, // Adjust this value based on your needs
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStep(step - 1);
      animation.setValue(-300);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleSubmit = async () => {
    const medicationData = {
      name,
      description,
      quantity: Number(quantity),
      strength: Number(dosage), // Sending dosage as strength
      expiryDate: expirationDate,
      prescription: true, // Assuming prescription is always true based on the model requirement
      indication: selectedIndications.map(indication =>
        indication.toLowerCase(),
      ),
      image: photoUrl,
      route: location, // Assuming 'route' refers to the location in Tunisia
      createdBy: user ? [user._id] : [], // Assuming 'user' contains user data and '_id' is the user's ID
    };

    try {
      // Retrieve the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        alert('User not authenticated');
        return;
      }

      const response = await fetch(
        'https://med-exchangevf.onrender.com/api/v2/medication',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
          body: JSON.stringify(medicationData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Medication Created successfully');
        // Clear the form
        setName('');
        setDescription('');
        setQuantity('');
        setDosage('');
        setExpirationDate(new Date());
        setSelectedIndications([]);
        setImage(null);
        setPhotoUrl('');
        setLocation('');
        setStep(1);
      } else {
        Alert.alert(`Failed to create medication: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred. Please try again.');
    }
  };

  const isStep1Valid = name.trim() !== '' && dosage.trim() !== '';
  const isStep2Valid = quantity.trim() !== '' && expirationDate;
  const isStep3Valid = selectedIndications.length > 0;
  const isStep4Valid = image !== null;
  const isStep5Valid = description.trim() !== '' && location.trim() !== '';

  useEffect(() => {
    if (step === 1 && isStep1Valid) {
      Animated.sequence([
        Animated.timing(nextButtonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(nextButtonTranslateX, {
              toValue: 10,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(nextButtonTranslateX, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]).start();
    }
  }, [isStep1Valid, nextButtonOpacity, nextButtonTranslateX, step]);

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color="#469496" />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Image source={logo} style={styles.inlineLogo} />
                <Text style={styles.title}>EDEX</Text>
              </View>
              <View style={styles.placeholder} />
            </View>

            <Animated.View
              style={[
                styles.formContainer,
                {transform: [{translateY: animation}]},
              ]}>
              <FormSteps
                step={step}
                name={name}
                setName={setName}
                dosage={dosage}
                setDosage={setDosage}
                quantity={quantity}
                setQuantity={setQuantity}
                expirationDate={expirationDate}
                setExpirationDate={setExpirationDate}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                selectedIndications={selectedIndications}
                setSelectedIndications={setSelectedIndications}
                image={image}
                setImage={setImage}
                description={description}
                setDescription={setDescription}
                photoUrl={photoUrl}
                setPhotoUrl={setPhotoUrl}
                mobileNumber={mobileNumber}
                setMobileNumber={setMobileNumber}
                location={location}
                setLocation={setLocation}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
                handleSubmit={handleSubmit}
                isStep1Valid={isStep1Valid}
                isStep2Valid={isStep2Valid}
                isStep3Valid={isStep3Valid}
                isStep4Valid={isStep4Valid}
                isStep5Valid={isStep5Valid}
                nextButtonOpacity={nextButtonOpacity}
                nextButtonTranslateX={nextButtonTranslateX}
              />
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.stepIndicatorContainer}>
        <StepIndicator style={styles.indicator} step={step} />
      </View>
    </View>
  );
};

export default MedicationForm;
