import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faSearch,
  faBell,
  faSignOutAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../Home/Styles'; // Import styles for Navbar

export default function Navbar({user}) {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <View style={styles.specialButtonContainer}>
        <TouchableOpacity
          style={styles.specialButton}
          onPress={() => {
            console.log('Navigating with user:', user);
            navigation.navigate('MedicationForm', {user: user});
          }}>
          <FontAwesomeIcon icon={faPlus} size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.navigation}>
          <View style={styles.navButtonGroup}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <FontAwesomeIcon icon={faHome} size={16} color="#75cabc" />
              <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                /* Navigate to Search */
              }}>
              <FontAwesomeIcon icon={faSearch} size={16} color="#75cabc" />
              <Text style={styles.navButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navButtonGroup}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                /* Navigate to Notifications */
              }}>
              <FontAwesomeIcon icon={faBell} size={16} color="#75cabc" />
              <Text style={styles.navButtonText}>Notifs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={signOut}>
              <FontAwesomeIcon icon={faSignOutAlt} size={16} color="#75cabc" />
              <Text style={styles.navButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
