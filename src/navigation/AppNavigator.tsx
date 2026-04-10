import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerScreens from './drawerScreens';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerScreens />
    </NavigationContainer>
  );
};

export default AppNavigator;
