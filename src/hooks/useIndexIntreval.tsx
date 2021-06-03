import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getRandomInt} from '@utils/CalculationUtils';

const useIndexIntreval = (maxIndex: number, intervalDuration: number) => {
  const navigation = useNavigation();
  const [indexIntreval, setIndexIntreval] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const focusListener = navigation.addListener('focus', () => {
      interval = setInterval(() => {
        setIndexIntreval(getRandomInt(maxIndex));
      }, intervalDuration);
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

  return {
    indexIntreval,
  };
};

export default useIndexIntreval;
