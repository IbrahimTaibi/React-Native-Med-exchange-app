import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 5,
    width: '100%',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleBold: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 5,
    color: '#fff',
    fontFamily: 'Lato-Regular',
    justifyContent: 'center', // Add this line
    paddingVertical: 0, // Add this line
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  flag: {
    width: 42,
    height: 32,
    marginRight: 10,
    borderRadius: 15,
    opacity: 0.7,
  },
  countryCode: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'Lato-Regular',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center', // Add this line
    marginTop: 7,
    paddingVertical: 0, // Add this line
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  errorText: {
    color: '#ff6f61',
    marginLeft: 5,
    fontFamily: 'Lato-Regular',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#75cabc',
    position: 'absolute',
    top: -25,
  },
  buttonText: {
    color: '#75cabc',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 50,
  },
  icon: {
    marginHorizontal: 10,
  },
  policyText: {
    color: 'black',
    marginTop: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Lato-Regular',
  },

  highlight: {
    color: '#469694',
    fontWeight: 'bold',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  photoButtonText: {
    color: '#fff',
    marginLeft: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
});
