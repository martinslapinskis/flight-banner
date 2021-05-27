import React, {forwardRef} from 'react';
import {
  TouchableOpacity,
  TextInput,
  TextInputProps,
  Text,
  StyleSheet,
} from 'react-native';

type Props = TextInputProps & {
  onPress?: () => void;
  title?: string;
};

const AirportTextInput = forwardRef<TextInput, Props>(
  ({onPress, value, title, onChangeText, placeholder}, ref) => {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          pointerEvents="none"
          ref={ref}
          value={value}
          onChangeText={onChangeText}
        />
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#A6A6AE',
  },
  container: {
    flex: 1,
    paddingLeft: 40,
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AirportTextInput;
