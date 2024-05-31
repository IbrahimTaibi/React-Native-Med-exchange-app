import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const placeholderImage = 'https://via.placeholder.com/150';

export default function MedicationList() {
  const route = useRoute();
  const navigation = useNavigation();
  const {category} = route.params;
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        let endpoint = `https://med-exchangevf.onrender.com/api/v2/medication/medications-by-indication/${category.name.toLowerCase()}`;
        if (category.name.toLowerCase() === 'tous') {
          endpoint = 'https://med-exchangevf.onrender.com/api/v2/medication';
        }

        const response = await axios.get(endpoint);
        setMedications(response.data.medications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, [category.name]);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <ImageBackground
        source={{uri: item.image || placeholderImage}}
        style={styles.image}
        imageStyle={{borderRadius: 8}}>
        <View style={styles.overlay}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationDosage}>
            Dosage: {item.strength} mg
          </Text>
        </View>
      </ImageBackground>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#75cabc" />
        <Text style={styles.loadingText}>Loading Medications...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#75cabc" />
        </TouchableOpacity>
        <Text style={styles.title}>{category.name}</Text>
      </View>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.medicationsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    color: '#75cabc',
  },
  medicationsContainer: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 10,
    borderColor: '#75cabc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200, // Adjust the height as needed
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  medicationName: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: '#fff',
  },
  medicationDosage: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#75cabc',
  },
});
