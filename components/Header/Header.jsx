import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import {styles} from '../Home/Styles';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch, faUser} from '@fortawesome/free-solid-svg-icons';

export default function Header({scrollY, user}) {
  const navigation = useNavigation();

  return (
    <Animated.View
      style={[
        styles.header,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 50],
                outputRange: [0, -50],
                extrapolate: 'clamp',
              }),
            },
          ],
        },
      ]}>
      <View style={styles.headerGradient}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>MEDEX</Text>
        </View>
        <View style={styles.headerBottom}>
          <TouchableOpacity
            style={styles.profileIcon}
            onPress={() => {
              navigation.navigate('Profile', {user});
            }}>
            {user && user.photo ? (
              <Image source={{uri: user.photo}} style={styles.userPhoto} />
            ) : (
              <FontAwesomeIcon icon={faUser} size={24} color="#fff" />
            )}
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for medications..."
              placeholderTextColor="#469496"
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                /* Search functionality */
              }}>
              <FontAwesomeIcon icon={faSearch} size={20} color="#469496" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
