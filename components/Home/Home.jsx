import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {styles} from './Styles';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {fetchLatestMedications} from '../../api'; // Import the new API function
import {UserContext} from '../User/UserContext'; // Import UserContext
import Navbar from '../Navbar/NavBar'; // Import Navbar
import LatestMedications from '../Medication/LatestMedication'; // Import LatestMedications component
import Header from '../Header/Header'; // Import Header component

import painReliefImage from '../../assets/categories/pain.png';
import cardiology from '../../assets/categories/Cardio.png';
import diabetes from '../../assets/categories/diabetes.png';
import pression from '../../assets/categories/tension.png';
import vitamines from '../../assets/categories/vitamines.png';
import bio from '../../assets/categories/bio.png';

export default function Home() {
  const navigation = useNavigation();
  const {user, loading} = useContext(UserContext); // Get user from context
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [latestMedications, setLatestMedications] = useState([]);
  const [error, setError] = useState(null);

  const categories = [
    {name: 'Tous', image: require('../../assets/categories/tous.png')},
    {name: 'Douleurs', image: painReliefImage},
    {name: 'Cardiologie', image: cardiology},
    {name: 'Diabetes', image: diabetes},
    {name: 'Tension', image: pression},
    {name: 'Vitamines', image: vitamines},
    {name: 'Bio', image: bio},
  ];

  useEffect(() => {
    fetchLatestMedications()
      .then(latest => setLatestMedications(latest))
      .catch(error => setError(error));
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#75cabc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading medications. Please try again later.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} user={user} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <Text style={styles.categoryTitle}>Catégories :</Text>

        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryListContainer}
          showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryItem,
                index === 0 ? styles.firstCategoryItem : {},
                index === categories.length - 1 ? styles.lastCategoryItem : {},
              ]}
              onPress={() => {
                navigation.navigate('MedicationList', {category});
              }}>
              <View style={styles.categoryImageContainer}>
                <Image source={category.image} style={styles.categoryImage} />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <LinearGradient
          colors={['#469694', '#75cabc']}
          style={styles.donationSection}>
          <Text style={styles.donationTitle}>Donate Medication</Text>
          <Text style={styles.donationText}>
            Use Medex to help those in need. Your donations can make a
            significant impact.
          </Text>
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => {
              navigation.navigate('MedicationForm', {user: user});
            }}>
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LatestMedications medications={latestMedications} />

        <View style={styles.featured}>
          <Text style={styles.sectionTitle}>Featured Medications</Text>
          {/* Medication items would go here */}
        </View>
      </Animated.ScrollView>

      <Navbar user={user} />
    </View>
  );
}
