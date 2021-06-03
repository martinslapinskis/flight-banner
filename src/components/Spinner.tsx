import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

interface Props {
  show: boolean;
}

const Spinner = (props: Props) => {
  const {show} = props;

  return show ? (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.spinnerView}>
        <ActivityIndicator animating={true} color={'white'} />
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 100,
  },
  spinnerView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: 'black',
  },
});

export default Spinner;
