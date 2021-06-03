import React, {useState, useEffect, useRef} from 'react';
import {MainParamList} from '@navigation/main';
import {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '@type/RootState';
import {BannerRequestData} from '@type/Banner';
import {getBannerData} from '@redux/actions';
import RNLocalize from 'react-native-localize';
import AirportTextInput from './components/AirportTextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import useIndexIntreval from '@hooks/useIndexIntreval';
import Spinner from '@components/Spinner';
import {
  firstFlightBackground,
  secondFlightBackground,
  thirdFlightBackground,
  iconFind,
} from '@assets/images';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

type Navigation = StackNavigationProp<MainParamList, 'Home'>;
interface Props {
  navigation: Navigation;
}

const INTERVAL_DURATION = 5000;
const SINGLE_IMG_TEMP = 20;
const BACKGROUND_IMGS = [
  firstFlightBackground,
  secondFlightBackground,
  thirdFlightBackground,
];

const HomeScreen = ({navigation}: Props) => {
  const {flightData, bannerInputData, isLoading} = useSelector(
    (state: RootState) => state.banner,
  );
  const headerHeight = useHeaderHeight();
  const [fromAirport, setFromAirport] = useState(
    bannerInputData?.fromCode || '',
  );
  const [toAirport, setToAirport] = useState(bannerInputData?.toCode || '');
  const [languageCode, setLanguageCode] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTS, setSelectedTS] = useState(bannerInputData?.ts || 0);
  const [isFindBtnActive, setFindBtnActive] = useState(false);
  const [backgroundImgIndex, setBackgroundImgIndex] = useState(0);
  const {indexIntreval} = useIndexIntreval(
    BACKGROUND_IMGS.length,
    INTERVAL_DURATION,
  );
  const fromAirportRef = useRef<TextInput>(null);
  const toAirportRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bannerInputData) {
      setPersistInputData(bannerInputData);
    } else {
      setNewInputData();
    }
  }, []);

  useEffect(() => {
    if (flightData) {
      // If temp is higher than SINGLE_IMG_TEMP than show 0 index img
      setBackgroundImgIndex(
        flightData.temp > SINGLE_IMG_TEMP ? 0 : indexIntreval,
      );
    }
  }, [indexIntreval]);

  useEffect(() => {
    setFindBtnActive(fromAirport?.length !== 0 && toAirport?.length !== 0);
  }, [fromAirport, toAirport]);

  const setPersistInputData = (data: BannerRequestData) => {
    setLanguageCode(data.lang);
    updateDate(new Date(data.ts));
  };

  const setNewInputData = () => {
    const locales = RNLocalize.getLocales().shift();
    setLanguageCode(locales?.languageCode || 'en');

    const currentDate = new Date();
    updateDate(currentDate);
  };

  const updateDate = (date: Date) => {
    // need to add one because month range 0-11
    const dateFormated = `${date.getFullYear()}-${date.getMonth() + 1}`;
    setSelectedTS(date.getTime());
    setSelectedDate(dateFormated);
  };

  const onDatePickerConfirm = (date: Date) => {
    updateDate(date);
    setDatePickerVisibility(false);
  };

  const onFindButtonPress = () => {
    dispatch(
      getBannerData({
        fromCode: fromAirport,
        toCode: toAirport,
        lang: languageCode,
        ts: selectedTS,
      }),
    );
  };

  const onNavigateToDetails = () => {
    if (flightData) {
      navigation.navigate('Details', {data: flightData});
    }
  };

  return (
    <View style={styles.container}>
      {flightData && (
        <ImageBackground
          source={BACKGROUND_IMGS[backgroundImgIndex]}
          style={styles.backViewImg}
        />
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{paddingTop: headerHeight, paddingBottom: 20}}>
        <View style={styles.pickerView}>
          <TouchableOpacity
            style={[styles.pickerButton, {opacity: 0.65}]}
            disabled>
            <Text style={styles.pickerSubtitle}>Language</Text>
            <Text style={styles.pickerTitle} numberOfLines={1}>
              {languageCode}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.pickerSubtitle}>Date</Text>
            <Text style={styles.pickerTitle} numberOfLines={1}>
              {selectedDate}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.airportView, styles.shadow]}>
          <AirportTextInput
            title="From"
            placeholder="JFX"
            onPress={() => fromAirportRef?.current?.focus()}
            ref={fromAirportRef}
            value={fromAirport}
            onChangeText={setFromAirport}
          />

          <View style={styles.divider} />

          <AirportTextInput
            title="To"
            placeholder="JFX"
            onPress={() => toAirportRef?.current?.focus()}
            ref={toAirportRef}
            value={toAirport}
            onChangeText={setToAirport}
          />

          <TouchableOpacity
            disabled={!isFindBtnActive}
            style={[styles.findButton, {opacity: isFindBtnActive ? 1 : 0.4}]}
            onPress={onFindButtonPress}>
            <Image source={iconFind} style={styles.findImg} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.infoView,
            styles.shadow,
            {opacity: flightData === null ? 0.4 : 1},
          ]}
          pointerEvents={flightData === null ? 'none' : 'auto'}>
          <Text style={[styles.title, {alignSelf: 'center'}]}>Information</Text>

          <View style={styles.infoItemsView}>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Country</Text>
              <Text style={styles.title} numberOfLines={1}>
                {flightData?.countryName}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>City</Text>
              <Text style={styles.title} numberOfLines={1}>
                {flightData?.cityName}
              </Text>
            </View>
          </View>

          <View style={styles.infoItemsView}>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>temperature</Text>
              <Text style={styles.title} numberOfLines={1}>
                {`${flightData?.temp || ''} ${flightData?.tempScale || ''}`}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Price</Text>
              <Text style={styles.title} numberOfLines={1}>
                {flightData?.price}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.moreInfoButton}
            activeOpacity={0.5}
            onPress={onNavigateToDetails}>
            <Text style={styles.moreInfoText}>More information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={onDatePickerConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <Spinner show={isLoading} />
    </View>
  );
};

export default HomeScreen;
