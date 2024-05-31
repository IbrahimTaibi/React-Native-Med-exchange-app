// MedicationDetails.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

const MedicationDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {medication} = route.params;
  const [createdByUser, setCreatedByUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = medication.createdBy[0];
        const response = await fetch(
          `https://med-exchangevf.onrender.com/api/v2/user/${userId}`,
        );
        const data = await response.json();
        if (response.ok) {
          setCreatedByUser(data.user);
        } else {
          console.error('Failed to fetch user details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [medication.createdBy]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatusBadgeStyle = status => {
    switch (status) {
      case 'Active':
        return styles.activeBadge;
      case 'Rejected':
        return styles.rejectedBadge;
      default:
        return styles.pendingBadge;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {medication.name} - {medication.strength}
      </Text>
      {medication.image && (
        <Image
          source={{uri: medication.image}}
          style={styles.medicationImage}
        />
      )}
      <View style={styles.line} />
      <View style={styles.infoContainer}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{formatDate(medication.expiryDate)}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Route:</Text>
          <Text style={styles.value}>{medication.route}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.fullColumn}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{medication.description}</Text>
      </View>
      <View style={styles.line} />
      <View style={styles.infoContainer}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Status:</Text>
          <View
            style={[
              styles.statusBadge,
              getStatusBadgeStyle(medication.status),
            ]}>
            <Text style={styles.badgeText}>{medication.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.line} />
      {medication.indication && medication.indication.length > 0 && (
        <View style={styles.fullColumn}>
          <Text style={styles.label}>Indications:</Text>
          <View style={styles.indicationsContainer}>
            {medication.indication.map((indication, index) => (
              <TouchableOpacity key={index} style={styles.indicationButton}>
                <Text style={styles.indicationText}>{indication}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      {createdByUser && (
        <View style={styles.userCard}>
          <Text style={styles.userCardTitle}>Donor Information</Text>
          {createdByUser.photo && (
            <Image
              source={{uri: createdByUser.photo}}
              style={styles.userImage}
            />
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userLabel}>Username:</Text>
            <Text style={styles.userValue}>{createdByUser.username}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userLabel}>Phone Number:</Text>
            <Text style={styles.userValue}>
              {createdByUser.phoneNumber
                ? createdByUser.phoneNumber
                : 'Number not available'}
            </Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    backgroundColor: '#75cabc',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
    color: '#fff',
    padding: 10,
  },
  medicationImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderColor: '75cabc',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#75cabc',
    marginVertical: 10,
    width: '85%',
    alignSelf: 'center',
    opacity: 0.7,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoColumn: {
    flex: 1,
    marginHorizontal: 10,
  },
  fullColumn: {
    marginBottom: 15,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    alignSelf: 'center',
  },
  value: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#777',
    alignSelf: 'center',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  pendingBadge: {
    backgroundColor: '#FFD700',
    alignSelf: 'center',
  },
  activeBadge: {
    backgroundColor: '#B2DFDB',
    alignSelf: 'center', // Light green color
  },
  rejectedBadge: {
    backgroundColor: '#F44336',
    alignSelf: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
  indicationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  indicationButton: {
    backgroundColor: '#75cabc',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  indicationText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  userCard: {
    padding: 20,
    backgroundColor: '#ecf8f8',
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  userCardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    color: '#75cabc',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  userLabel: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#333',
  },
  userValue: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#777',
  },
  backButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#75cabc',
    borderRadius: 30,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#FFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
});

export default MedicationDetails;
