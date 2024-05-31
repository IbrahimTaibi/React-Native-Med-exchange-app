import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faCamera,
  faUpload,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {styles} from './MedicationFormStyles';

const indicationsList = [
  'Douleurs',
  'Cardiologie',
  'Diabetes',
  'Tension',
  'Vitamines',
  'Bio',
];

const FormSteps = ({
  step,
  name,
  setName,
  dosage,
  setDosage,
  quantity,
  setQuantity,
  expirationDate,
  setExpirationDate,
  showDatePicker,
  setShowDatePicker,
  selectedIndications,
  setSelectedIndications,
  image,
  setImage,
  description,
  setDescription,
  photoUrl,
  setPhotoUrl,
  mobileNumber,
  setMobileNumber,
  location,
  setLocation,
  handleNext,
  handlePrevious,
  handleSubmit,
  isStep1Valid,
  isStep2Valid,
  isStep3Valid,
  isStep4Valid,
  isStep5Valid,
  nextButtonOpacity,
  nextButtonTranslateX,
}) => {
  const handleIndicationToggle = indication => {
    setSelectedIndications(prev =>
      prev.includes(indication)
        ? prev.filter(i => i !== indication)
        : [...prev, indication],
    );
  };
  const toggleIndication = indication => {
    setSelectedIndications(prevIndications =>
      prevIndications.includes(indication)
        ? prevIndications.filter(i => i !== indication)
        : [...prevIndications, indication],
    );
  };
  const renderIndication = ({item}) => (
    <TouchableOpacity
      style={[
        styles.indicationButton,
        selectedIndications.includes(item) && styles.selectedIndicationButton,
      ]}
      onPress={() => toggleIndication(item)}>
      <Text
        style={[
          styles.indicationText,
          selectedIndications.includes(item) && styles.selectedIndicationText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleImagePicker = fromCamera => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    const callback = response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        console.log('Image selected:', selectedImage);
        setImage(selectedImage);
        handleUploadPhoto(selectedImage);
      } else {
        console.log('Unexpected response: ', response);
      }
    };

    if (fromCamera) {
      launchCamera(options, callback);
    } else {
      launchImageLibrary(options, callback);
    }
  };

  const handleUploadPhoto = async uri => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'medication_photo.jpg',
    });
    formData.append('upload_preset', 'uwicjqiw'); // Replace with your Cloudinary upload preset
    formData.append('cloud_name', 'dginjvkv3'); // Replace with your Cloudinary cloud name

    try {
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dginjvkv3/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setPhotoUrl(uploadResponse.data.secure_url);
    } catch (error) {
      console.error(
        'Error uploading photo to Cloudinary',
        error.response ? error.response.data : error.message,
      );
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleCameraLaunch = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    const result = await launchCamera(options);
    if (!result.didCancel && !result.errorCode) {
      const {uri} = result.assets[0];
      setImage(uri);
      try {
        const formData = new FormData();
        formData.append('image', {
          uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await axios.post(
          'https://med-exchangevf.onrender.com/api/v2/medication/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        setPhotoUrl(response.data.imageUrl);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
  };

  return (
    <>
      {step === 1 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name of the Medication"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Dosage"
            value={dosage}
            onChangeText={setDosage}
            keyboardType="numeric"
          />

          {isStep1Valid && (
            <Animated.View
              style={[
                styles.nextButtonContainer,
                {
                  opacity: nextButtonOpacity,
                  transform: [{translateX: nextButtonTranslateX}],
                },
              ]}>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={16}
                  color="#469496"
                />
              </TouchableOpacity>
            </Animated.View>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}>
            <Text>
              {expirationDate
                ? expirationDate.toDateString()
                : 'Select Expiration Date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={expirationDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                // eslint-disable-next-line no-undef
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setExpirationDate(selectedDate);
                }
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handlePrevious}>
              <FontAwesomeIcon icon={faArrowLeft} size={16} color="#469496" />
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>

            {isStep2Valid && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={16}
                  color="#469496"
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Select Indications:</Text>
          <FlatList
            data={indicationsList}
            renderItem={renderIndication}
            keyExtractor={item => item}
            numColumns={2}
            contentContainerStyle={styles.indicationsContainer}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handlePrevious}>
              <FontAwesomeIcon icon={faArrowLeft} size={16} color="#469496" />
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>

            {isStep3Valid && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={16}
                  color="#469496"
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.label}>Upload a Photo of the Medication:</Text>
          <Text style={styles.instructions}>
            Make sure the photo shows the expiration date clearly.
          </Text>

          <View style={styles.imagePickerContainer}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => handleImagePicker(true)}>
              <FontAwesomeIcon icon={faCamera} size={24} color="#469496" />
              <Text style={styles.imageButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => handleImagePicker(false)}>
              <FontAwesomeIcon icon={faUpload} size={24} color="#469496" />
              <Text style={styles.imageButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{uri: image}} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}>
                <FontAwesomeIcon icon={faTimes} size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handlePrevious}>
              <FontAwesomeIcon icon={faArrowLeft} size={16} color="#469496" />
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>

            {isStep4Valid && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={16}
                  color="#469496"
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {step === 5 && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile Number (Optional)"
            value={mobileNumber}
            onChangeText={setMobileNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Location in Tunisia"
            value={location}
            onChangeText={setLocation}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handlePrevious}>
              <FontAwesomeIcon icon={faArrowLeft} size={16} color="#469496" />
              <Text style={styles.nextButtonText}>Back</Text>
            </TouchableOpacity>

            {isStep5Valid && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSubmit}>
                <Text style={styles.nextButtonText}>Submit</Text>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size={16}
                  color="#469496"
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </>
  );
};

export default FormSteps;
