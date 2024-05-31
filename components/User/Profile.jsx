import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faCog} from '@fortawesome/free-solid-svg-icons';
import {Picker} from '@react-native-picker/picker';
import PhoneInput from 'react-native-phone-input';

const Profile = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = route.params;
  const [medications, setMedications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({...user});
  const [selectedLocation, setSelectedLocation] = useState('Tunis');
  const [medicationsModalVisible, setMedicationsModalVisible] = useState(false);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch(
          `https://med-exchangevf.onrender.com/api/v2/medication?createdBy=${user._id}`,
        );
        const data = await response.json();
        if (response.ok) {
          setMedications(data.medications);
        } else {
          console.error('Failed to fetch medications:', data.message);
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
      }
    };

    fetchMedications();
  }, [user._id]);

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

  const handleSave = () => {
    setModalVisible(false);
    // Save updated user information
    // Make API call to save the updated user information
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#469496" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faCog} size={24} color="#469496" />
      </TouchableOpacity>
      <View style={styles.content}>
        {user.photo && (
          <Image source={{uri: user.photo}} style={styles.userPhoto} />
        )}
        <Text style={styles.userName}>{user.username}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        {user.bio && <Text style={styles.userBio}>{user.bio}</Text>}
        <TouchableOpacity
          style={styles.showMedicationsButton}
          onPress={() => setMedicationsModalVisible(true)}>
          <Text style={styles.showMedicationsButtonText}>Show Medications</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={updatedUser.name}
                  onChangeText={text =>
                    setUpdatedUser({...updatedUser, name: text})
                  }
                  placeholder="Name"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={updatedUser.email}
                  onChangeText={text =>
                    setUpdatedUser({...updatedUser, email: text})
                  }
                  placeholder="Email"
                />
              </View>
              <View style={styles.inputContainer}>
                <PhoneInput
                  initialCountry="tn"
                  style={styles.input}
                  textStyle={{fontSize: 14}}
                  onChangePhoneNumber={phoneNumber =>
                    setUpdatedUser({...updatedUser, phoneNumber})
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Location:</Text>
                <Picker
                  selectedValue={selectedLocation}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLocation(itemValue)
                  }>
                  <Picker.Item label="Tunis" value="Tunis" />
                </Picker>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleSave}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={medicationsModalVisible}
          onRequestClose={() => setMedicationsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Uploaded Medications</Text>
              <ScrollView style={styles.medicationsTable}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Name</Text>
                  <Text style={styles.tableHeaderText}>Expiry Date</Text>
                  <Text style={styles.tableHeaderText}>Created At</Text>
                  <Text style={styles.tableHeaderText}>Status</Text>
                </View>
                {medications.map((medication, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.tableRow}
                    onPress={() =>
                      navigation.navigate('MedicationDetails', {medication})
                    }>
                    <Text style={styles.tableCell}>{medication.name}</Text>
                    <Text style={styles.tableCell}>
                      {formatDate(medication.expiryDate)}
                    </Text>
                    <Text style={styles.tableCell}>
                      {formatDate(medication.createdAt)}
                    </Text>
                    <View style={styles.tableCell}>
                      <View
                        style={[
                          styles.statusBadge,
                          getStatusBadgeStyle(medication.status),
                        ]}>
                        <Text style={styles.badgeText}>
                          {medication.status}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.modalButton, styles.closeButton]}
                onPress={() => setMedicationsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  showMedicationsButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#469496',
    borderRadius: 5,
  },
  showMedicationsButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    fontFamily: 'Roboto',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
    fontFamily: 'Roboto',
  },
  input: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#469496',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  picker: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#469496',
    fontSize: 14,
    color: '#333',
    fontFamily: 'Roboto',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
  },
  saveButton: {
    backgroundColor: '#469496',
  },
  closeButton: {
    backgroundColor: '#ff5c5c',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  medicationsTable: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
    paddingVertical: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    paddingVertical: 10,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
    paddingVertical: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    paddingVertical: 10,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingBadge: {
    backgroundColor: '#ffeb99',
  },
  activeBadge: {
    backgroundColor: '#d4edda',
  },
  rejectedBadge: {
    backgroundColor: '#f8d7da',
  },
  badgeText: {
    color: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});

export default Profile;
