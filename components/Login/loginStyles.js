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
    fontFamily: 'Poppins-Bold', // Using Poppins Bold
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Lato-Regular', // Using Lato Regular
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
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Lato-Regular', // Using Lato Regular
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
    top: -25, // Adjust this value as needed to position the button correctly
  },
  buttonText: {
    color: '#75cabc',
    fontSize: 18,
    fontFamily: 'Poppins-Bold', // Using Poppins Bold
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 50, // Adjust this value to position the icons properly
  },
  icon: {
    marginHorizontal: 10,
  },
  policyText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
  highlited: {
    fontWeight: 'bold',
    color: '#469694',
  },
});
