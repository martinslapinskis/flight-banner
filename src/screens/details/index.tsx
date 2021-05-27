import React from 'react';
import {MainParamList} from '@navigation/main';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {firstFlightBackground} from '@assets/images';
import {View, ImageBackground, StyleSheet} from 'react-native';

type Route = RouteProp<MainParamList, 'Details'>;
type Navigation = StackNavigationProp<MainParamList, 'Details'>;

interface Props {
  navigation: Navigation;
  route: Route;
}

const DetailsScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={firstFlightBackground} style={styles.backViewImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backViewImg: {
    width: '100%',
    height: 300,
    position: 'absolute',
  },
});

export default DetailsScreen;
