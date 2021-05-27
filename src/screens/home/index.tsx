import React, {useState, useEffect, useRef} from 'react';
import {MainParamList} from '@navigation/main';
import {StackNavigationProp} from '@react-navigation/stack';
import {useHeaderHeight} from '@react-navigation/stack';
import {getRandomInt} from '@utils/CalculationUtils';
import RNLocalize from 'react-native-localize';
import AirportTextInput from './components/AirportTextInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';
import {
  firstFlightBackground,
  secondFlightBackground,
  thirdFlightBackground,
  iconRefresh,
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
const backgroundImgs = [
  firstFlightBackground,
  secondFlightBackground,
  thirdFlightBackground,
];

const HomeScreen = ({navigation}: Props) => {
  const headerHeight = useHeaderHeight();
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [languageCode, setLanguageCode] = useState<string>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [backgroundImgIndex, setBackgroundImgIndex] = useState(0);
  const fromAirportRef = useRef<TextInput>(null);
  const toAirportRef = useRef<TextInput>(null);
  let selectedTS = 0;

  useEffect(() => {
    const locales = RNLocalize.getLocales().shift();
    setLanguageCode(locales?.languageCode);

    const currentDate = new Date();
    updateDate(currentDate);
  }, []);

  // Repeat interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const focusListener = navigation.addListener('focus', () => {
      interval = setInterval(() => {
        setBackgroundImgIndex(getRandomInt(backgroundImgs.length));
      }, INTERVAL_DURATION);
    });

    const blutListener = navigation.addListener('blur', () => {
      removeInterval();
    });

    const removeInterval = () => {
      if (interval) {
        clearInterval(interval);
      }
    };

    return () => {
      removeInterval();
      focusListener();
      blutListener();
    };
  }, [navigation]);

  const onDatePickerConfirm = (date: Date) => {
    updateDate(date);
    setDatePickerVisibility(false);
  };

  const updateDate = (date: Date) => {
    // need to add one because month range 0-11
    const dateFormated = `${date.getFullYear()}-${date.getMonth() + 1}`;
    selectedTS = date.getTime();

    setSelectedDate(dateFormated);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImgs[backgroundImgIndex]}
        style={styles.backViewImg}
      />

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

          <View style={styles.divider}>
            <Image source={iconRefresh} style={styles.refreshButton} />
          </View>

          <AirportTextInput
            title="To"
            placeholder="JFX"
            onPress={() => toAirportRef?.current?.focus()}
            ref={toAirportRef}
            value={toAirport}
            onChangeText={setToAirport}
          />
        </View>

        <View style={[styles.infoView, styles.shadow]}>
          <Text style={[styles.title, {alignSelf: 'center'}]}>Information</Text>

          <View style={styles.infoItemsView}>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Country</Text>
              <Text style={styles.title} numberOfLines={1}>
                Latvia
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>City</Text>
              <Text style={styles.title} numberOfLines={1}>
                Riga
              </Text>
            </View>
          </View>

          <View style={styles.infoItemsView}>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>temperature</Text>
              <Text style={styles.title} numberOfLines={1}>
                23E
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.subtitle}>Price</Text>
              <Text style={styles.title} numberOfLines={1}>
                E23.00
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.moreInfoButton}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Details', {})}>
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
    </View>
  );
};

export default HomeScreen;
