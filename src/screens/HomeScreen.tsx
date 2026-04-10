import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from '../components/home/home';
type Props = {
  setIsAuthenticated: (value: boolean) => void;
};
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
