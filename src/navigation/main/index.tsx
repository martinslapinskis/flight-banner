import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@screens/home';
import DetailsScreen from '@screens/details';
import AppStyles from '@constants/AppStyles';
import {FlightFullDetails} from '@type/Flight';

export type MainParamList = {
  Home: {};
  Details: {data: FlightFullDetails};
};

const MainStack = createStackNavigator<MainParamList>();

export default () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Book flight',
          ...AppStyles.headerOption,
        }}
      />
      <MainStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          ...AppStyles.headerOption,
        }}
      />
    </MainStack.Navigator>
  );
};
