import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerGradient: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Lato-Black',
    color: '#469496',
    textAlign: 'center',
  },
  headerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileIcon: {
    marginRight: 10,
    padding: 5,
  },
  userPhoto: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#469496',
    borderWidth: 2,
    borderRadius: 25,
    paddingHorizontal: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#75cabc',
    fontFamily: 'Poppins-Regular',
  },
  searchButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginVertical: 10,
    paddingHorizontal: 10,
    marginTop: 110,
  },
  categoryListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  categoryItem: {
    width: 70,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  firstCategoryItem: {
    marginLeft: 0,
  },
  lastCategoryItem: {
    marginRight: 0,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
    justifyContent: 'center',
  },
  categoryImage: {
    alignSelf: 'center',
    width: 50,
    height: 50,
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  donationSection: {
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  donationTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    marginBottom: 10,
  },
  donationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    marginBottom: 10,
  },
  donateButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  donateButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#75cabc',
  },
  latestMedicationsTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  latestMedicationsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  medicationCard: {
    width: 150,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  medicationImage: {
    width: '100%',
    height: 200,
  },
  medicationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  medicationText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
  },
  featured: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  navigation: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    zIndex: 1, // Ensure the navigation bar has a higher zIndex
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  navButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 12,
    color: '#75cabc',
  },
  specialButtonContainer: {
    position: 'absolute',
    bottom: 3,
    alignSelf: 'center',
    zIndex: 10,
  },
  specialButton: {
    backgroundColor: '#469694',
    borderRadius: 37.5,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  specialButtonText: {
    fontSize: 36,
    color: '#fff',
    lineHeight: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'red',
    textAlign: 'center',
  },
});
