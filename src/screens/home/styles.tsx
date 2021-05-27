import {StyleSheet} from 'react-native';
import AppStyles from '@constants/AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  pickerView: {
    marginTop: 50,
    height: 70,
    flexDirection: 'row',
  },
  pickerButton: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  pickerTitle: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerSubtitle: {
    fontSize: 16,
    color: 'black',
  },
  airportView: {
    marginVertical: 20,
    marginTop: 20,
    height: 180,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  airportButton: {
    flex: 1,
    paddingLeft: 40,
    justifyContent: 'center',
  },
  airportInput: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoView: {
    paddingTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  infoItemsView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginTop: 2,
    fontSize: 20,
    fontWeight: 'bold',
    color: AppStyles.colors.COLOR_TEXT,
  },
  subtitle: {
    fontSize: 18,
    color: '#A6A6AE',
  },
  refreshButton: {
    width: 30,
    height: 30,
    top: -15,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  moreInfoButton: {
    marginTop: 50,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.COLOR_PRIMARY,
  },
  moreInfoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  backViewImg: {
    width: '100%',
    height: 300,
    position: 'absolute',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
  },
});

export default styles;
