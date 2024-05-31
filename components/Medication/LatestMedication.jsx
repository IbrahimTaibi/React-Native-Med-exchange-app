// src/components/LatestMedications.js

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../Home/Styles';
export default function LatestMedications({medications}) {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.latestMedicationsTitle}>Latest Medications</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.latestMedicationsContainer}
        showsHorizontalScrollIndicator={false}>
        {medications.map((medication, index) => (
          <TouchableOpacity
            key={index}
            style={styles.medicationCard}
            onPress={() =>
              navigation.navigate('MedicationDetails', {medication})
            }>
            <Image
              source={{uri: medication.image}}
              style={styles.medicationImage}
            />
            <View style={styles.medicationOverlay}>
              <Text style={styles.medicationText}>{medication.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
