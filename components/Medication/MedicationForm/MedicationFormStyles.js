import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    position: 'relative',
  },
  backButton: {
    marginLeft: 0,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    marginHorizontal: 10,
  },
  placeholder: {
    width: 56, // Width to match the Next button size
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#469496',
  },
  inlineLogo: {
    width: 32, // Adjust the width as needed
    height: 32, // Adjust the height as needed
    marginRight: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f8f9fa',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  indicationsContainer: {
    alignItems: 'center',
  },
  indicationButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#469496',
    borderRadius: 5,
  },
  selectedIndicationButton: {
    backgroundColor: '#469496',
  },
  indicationText: {
    color: '#469496',
  },
  selectedIndicationText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  nextButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#469496',
    fontSize: 16,
    marginRight: 5,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  imageButton: {
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#469496',
    marginTop: 5,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderColor: '#469496',
    borderWidth: 1,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#469496',
    borderRadius: 12,
    padding: 5,
  },
  instructions: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  stepIndicatorContainer: {
    position: 'absolute',
    bottom: 60, // Adjust this value as needed to position it higher
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it is above other content
  },
});
